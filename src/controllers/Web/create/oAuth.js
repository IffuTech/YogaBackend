const { createRouter } = require("../../../routes/createRouter");
const jwt = require('jsonwebtoken');
const axios = require("axios")
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateBlog = async (req, res) => {


    const apiKey = '0B1fnVerQAGUR2gHvAaY5A';
    const apiSecret = 'nLUBQ26ZX24F41uq7ibDMlRH6nvCkiDw';

    async function generateJWT() {
        const payload = {
          iss: apiKey,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
        };
        const token = jwt.sign(payload, apiSecret);
        return token;
      }

    const jwtToken = await generateJWT();
    try {
        
        const response = await axios.get(`https://zoom.us/oauth/authorize?response_type=code&client_id=0B1fnVerQAGUR2gHvAaY5A&redirect_uri=https://oauth.pstmn.io/v1/callback`);
        // console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error('Error creating Zoom meeting:', error);
        res.status(500).json({ error: 'Error creating Zoom meeting' });
    }
}

createRouter.get("/oauth", CreateBlog);

