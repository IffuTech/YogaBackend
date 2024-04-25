// const { createRouter } = require("../../../routes/createRouter");
// const jwt = require('jsonwebtoken');
// const axios = require("axios");
// const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');

// const CreateBlog = async (req, res) => {
//     const apiKey = 'Sp5AnYUVQLu4DANQuEiHtA';
//     const apiSecret = 'uCXfOS0OUaiUUUNftRKWxvEHLEjGxffA';

//     // async function generateJWT() {
//     //     const expiresInDays = 90;
//     //     const expirationTimeInSeconds = expiresInDays * 24 * 60 * 60; // Convert days to seconds
//     //     const payload = {
//     //         iss: apiKey,
//     //         exp: Math.floor(Date.now() / 1000) + expirationTimeInSeconds,
//     //     };
//     //     const token = jwt.sign(payload, apiSecret, { algorithm: 'HS256' });
//     //     return token;
//     // }
    

//     const jwtToken = process.env.TOKEN;

//     try {
//         const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
//             topic: 'My Zoom Meeting',
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${jwtToken}`, // Use 'Bearer' for JWT tokens
//                 'Content-Type': 'application/json',
//             },
//         });

//         const { join_url, start_url } = response.data;
//         res.json({ join_url, start_url });
//     } catch (error) {
//         console.error('Error creating Zoom meeting:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Error creating Zoom meeting' });
//     }
// }

// createRouter.post("/meeting-url", CreateBlog);



const { createRouter } = require("../../../routes/createRouter");
// const jwt = require('jsonwebtoken');
const axios = require("axios")
require('dotenv').config();

const token = process.env.TOKEN;
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateBlog = async (req, res) => {

    // const apiKey = 'dm85ooCsSFGAjm5ovqUkA';
    // const apiSecret = 'U0eRnR1HJoRGYRhr5nhO6MrbRVdZOyF9';
    const apiKey= 'WJtmiv4GRWil9v3T8oE4zg';
    const apiSecret = 'CDa5DMvC9XSM2YKakG7P3KsmDnKaAk7K';

    // async function generateJWT() {
    //     const payload = {
    //       iss: apiKey,
    //       exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
    //     };
    //     const token = jwt.sign(payload, apiSecret);
    //     return token;
    //   }

    // const jwtToken = process.env.Token;
    // console.log("jwttokeeeeeeeeeee",jwtToken)
    try {
        
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic: 'My Zoom Meeting',
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const { join_url, start_url } = response.data;
        res.json({ join_url, start_url });
    } catch (error) {
        console.error('Error creating Zoom meeting:', error);
        res.status(500).json({ error: 'Error creating Zoom meeting' });
    }
}

createRouter.post("/meeting-url", CreateBlog);