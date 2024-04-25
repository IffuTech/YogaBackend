const { createRouter } = require("../../../routes/createRouter");
const axios = require("axios");

const CreateBlog = async (req, res) => {
    const apiKey = '73x5xjZ1Q4Kvpff_LdkLcg';
    const apiSecret = 'vAVYnkQLeP8LTO8EW2qDNeURbKAhoxS6';

    const requestData = {
        grant_type: 'authorization_code',
        code: req.body.code, // Dynamically obtain the code during the OAuth flow
        redirect_uri: 'http://localhost:3000',
    };

    try {
        const response = await axios.post(
            'https://api.zoom.us/oauth/token',
            new URLSearchParams(requestData).toString(), // Send data as x-www-form-urlencoded
            {
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error getting Zoom access token:', error);
        res.status(500).json({ error: 'Error getting Zoom access token', details: error.message });
    }
};

createRouter.post("/oauth2", CreateBlog);
