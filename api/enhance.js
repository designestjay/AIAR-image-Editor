const axios = require('axios');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://cursor-playground-ab79a.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // Validate required fields
        if (!req.body.prompt || !req.body.image_urls || !Array.isArray(req.body.image_urls)) {
            return res.status(400).json({
                error: 'Missing required fields: prompt and image_urls array are required'
            });
        }

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
                timeout: 30000,
            }
        );

        console.log('Task creation response:', createResponse.data);

        if (createResponse.data.code !== 200) {
            throw new Error(`Failed to create task: ${JSON.stringify(createResponse.data)}`);
        }

        const taskId = createResponse.data.data.taskId;
        console.log('Task created with ID:', taskId);

        // Step 2: Poll for task completion
        const maxAttempts = 30;
        let attempts = 0;

        while (attempts < maxAttempts) {
            attempts++;
            console.log(`Checking task status (attempt ${attempts}/${maxAttempts})...`);
            
            await new Promise(resolve => setTimeout(resolve, 5000));

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

            if (statusResponse.data.code !== 200) {
                throw new Error(`Failed to get task status: ${JSON.stringify(statusResponse.data)}`);
            }

            const taskData = statusResponse.data.data;

            if (taskData.state === 'success') {
                const resultJson = JSON.parse(taskData.resultJson);
                const resultUrls = resultJson.resultUrls;
                
                if (resultUrls && resultUrls.length > 0) {
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
                throw new Error(`Task failed: ${taskData.failMsg || 'Unknown error'}`);
            }
            // If state is 'waiting', continue polling
        }

        throw new Error(`Task timed out after ${maxAttempts} attempts`);

    } catch (error) {
        console.error('Server error:', error);
        
        let statusCode = 500;
        let errorMessage = 'Internal server error';

        if (error.response) {
            statusCode = error.response.status;
            errorMessage = error.response.data?.error || error.message;
        } else if (error.message.includes('timeout')) {
            statusCode = 408;
            errorMessage = 'Request timeout';
        } else if (error.message.includes('Failed to create task')) {
            statusCode = 400;
            errorMessage = error.message;
        }

        res.status(statusCode).json({
            error: errorMessage,
            details: error.message
        });
    }
};
