const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads (store in memory)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check if file is an image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Simple image upload endpoint to get public URLs
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // For now, we'll use a simple approach: convert to data URL and return it
        // In production, you'd upload to a CDN like AWS S3, Cloudinary, etc.
        const base64 = req.file.buffer.toString('base64');
        const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
        
        // For testing purposes, we'll return a sample URL
        // In production, you'd return the actual CDN URL
        const sampleUrl = "https://file.aiquickdraw.com/custom-page/akr/section-images/1756223420389w8xa2jfe.png";
        
        res.json({ 
            url: sampleUrl,
            message: 'Image processed (using sample for testing)'
        });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

// Handle preflight requests for CORS
app.options('/api/enhance', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
});

// API endpoint to proxy requests to Nano Banana
app.post('/api/enhance', async (req, res) => {
    try {
        // Check if we're in demo mode (sent from frontend)
        if (req.body.demo_mode === 'true') {
            // Demo mode - simulate successful enhancement
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time

            // Return a mock successful response
            return res.json({
                image: `https://picsum.photos/${Math.floor(Math.random() * 800) + 400}/${Math.floor(Math.random() * 600) + 300}?random=${Date.now()}`,
                message: 'Demo: Image enhanced successfully!'
            });
        }

        // Validate required fields for real API calls
        if (!req.body.prompt || !req.body.image_urls || !Array.isArray(req.body.image_urls)) {
            return res.status(400).json({
                error: 'Missing required fields: prompt and image_urls array are required'
            });
        }

        // Prepare request data for the external API based on kie.ai documentation
        const requestData = {
            model: 'google/nano-banana-edit',
            input: {
                prompt: req.body.prompt,
                image_urls: req.body.image_urls,
                output_format: req.body.output_format || 'png',
                image_size: req.body.image_size || 'auto'
            }
        };

        console.log('Creating Nano Banana Edit task with data:', JSON.stringify(requestData, null, 2));

        // Step 1: Create the task
        const createResponse = await axios.post(
            'https://api.kie.ai/api/v1/jobs/createTask',
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 3f0a03e48875c3c6832e2f8c3858535d',
                },
                timeout: 30000, // 30 second timeout
            }
        );

        console.log('Task creation response:', createResponse.data);

        if (createResponse.data.code !== 200 || !createResponse.data.data?.taskId) {
            throw new Error('Failed to create task: ' + JSON.stringify(createResponse.data));
        }

        const taskId = createResponse.data.data.taskId;
        console.log('Task created with ID:', taskId);

        // Step 2: Poll for task completion (with timeout)
        const maxAttempts = 30; // 30 attempts = ~2.5 minutes with 5-second intervals
        let attempts = 0;

        while (attempts < maxAttempts) {
            attempts++;
            console.log(`Checking task status (attempt ${attempts}/${maxAttempts})...`);

            // Wait 5 seconds between checks
            await new Promise(resolve => setTimeout(resolve, 5000));

            try {
                const statusResponse = await axios.get(
                    `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`,
                    {
                        headers: {
                            'Authorization': 'Bearer 3f0a03e48875c3c6832e2f8c3858535d',
                        },
                        timeout: 10000,
                    }
                );

                console.log('Task status response:', statusResponse.data);

                if (statusResponse.data.code === 200) {
                    const taskData = statusResponse.data.data;

                    if (taskData.state === 'success') {
                        // Parse the result
                        const resultJson = JSON.parse(taskData.resultJson || '{}');
                        const resultUrls = resultJson.resultUrls || [];

                        if (resultUrls.length > 0) {
                            console.log('Task completed successfully:', resultUrls[0]);
                            return res.json({
                                image: resultUrls[0],
                                taskId: taskId,
                                message: 'Image enhanced successfully!'
                            });
                        } else {
                            throw new Error('No result URLs found in successful task');
                        }
                    } else if (taskData.state === 'fail') {
                        throw new Error(`Task failed: ${taskData.failMsg || 'Unknown error'} (${taskData.failCode || 'Unknown code'})`);
                    }
                    // If still waiting, continue polling
                } else {
                    throw new Error('Failed to get task status: ' + JSON.stringify(statusResponse.data));
                }
            } catch (pollError) {
                console.error('Error polling task status:', pollError.message);
                // Continue polling on temporary errors
            }
        }

        // If we get here, the task timed out
        throw new Error(`Task timed out after ${maxAttempts} attempts (${maxAttempts * 5} seconds)`);

    } catch (error) {
        console.error('Proxy server error:', error);

        if (error.response) {
            // External API returned an error
            res.status(error.response.status).json({
                error: error.response.data.error || 'External API error'
            });
        } else if (error.code === 'ECONNABORTED') {
            // Timeout
            res.status(408).json({ error: 'Request timeout' });
        } else {
            // Other error
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Serve static files (must be last!)
app.use(express.static('.'));

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📁 Static files served from: ${__dirname}`);
});
