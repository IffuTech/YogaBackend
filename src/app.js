const express = require("express");
const os = require("os");
const app = express();
const path = require('path')
const fileUpload = require("express-fileupload");
const cors = require("cors");
const axios = require('axios');
require('dotenv').config();


const port = 3000;
const token = process.env.TOKEN;



app.use(cors())
app.get("assets/images/*", (req, res) => {
    res.sendfile("assets/images/" + req.params[0]);
});

app.use(fileUpload({
    userTempFiles: true,
    preserveExtension: true,
    tempFileDir: os.tmpdir(),
    parseNested: true
}));

app.get("/", async (req, res) => {
    const code = req.query.code;
  
    try {
      const response = await axios.post("https://zoom.us/oauth/token", null, {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.REDIRECT_URI,
          // Setting the expiration time for the access token (30 days)
          expires_in: 2592000,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`
          ).toString("base64")}`,
        },
      });
      res.send(response.data.access_token);
    } catch (error) {
      console.error("Error", error);
      res.send("Error");
    }
  });
  

// app.use((req, res, next) => {
//     req.body = {
//         ...req.body,
//         ...req.files
//     };
//     +next();
// })

app.use(express.json());
app.use(express.static("assets"));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

module.exports = {
    app
}
