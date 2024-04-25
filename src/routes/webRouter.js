// const { fs } = require("fs");
// const { app } = require("../app");
// const axios = require("axios")
// const { wrapRequestHandler } = require("../helpers/response");

// // app.get("/*", wrapRequestHandler(async (req, res) => {
// //     const data = await new Promise((resolve, reject) => fs.readFile("frontend-assets.json", (error, data) => error ? resolve(error) : reject(data)));
// //     const assets = JSON.parse(data);
// //     res.render("index", {assets})
// // }));

// app.get('/oauthZoom', async (req, res) => {
//     const apiKey = 'WJtmiv4GRWil9v3T8oE4zg';
//     const apiSecret = 'a1tt3E5Lb2l1nXIDxQmP99cT63eH8qtm';
//     const response = await axios.post(`https://zoom.us/oauth/authorize?response_type=code&client_id=${apiKey}&redirect_uri=http://localhost:4000`);
//     console.log(response.data);
//     res.render('zoom_oauth', { data: response.data })
// })

const { app } = require("../app");
const axios = require("axios");
const { wrapRequestHandler } = require("../helpers/response");

app.get('/oauthZoom', async (req, res) => {
    const apiKey = '73x5xjZ1Q4Kvpff_LdkLcg';
    const redirectUri = 'http://localhost:6001'; // Update with your actual redirect URI
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=73x5xjZ1Q4Kvpff_LdkLcg&redirect_uri=http://localhost:6001`;

    // Redirect the user to the Zoom authorization URL
    res.redirect(zoomAuthUrl);
});
