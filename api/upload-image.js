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
        // For Vercel, we need to handle multipart/form-data differently
        // This is a simplified version - in production you'd use a proper multipart parser
        
        // For now, let's use a sample image URL
        // In a real implementation, you'd parse the uploaded file and upload to Imgur
        
        const sampleImageUrl = "https://file.aiquickdraw.com/custom-page/akr/section-images/1756223420389w8xa2jfe.png";
        
        res.json({ 
            url: sampleImageUrl,
            message: 'Image uploaded successfully (using sample for demo)'
        });
        
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
};
