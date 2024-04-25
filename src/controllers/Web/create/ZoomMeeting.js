require('dotenv').config()
const KJUR = require('jsrsasign')
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateBlog = async (req, res) => {
const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: "WJtmiv4GRWil9v3T8oE4zg",
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: "WWJtmiv4GRWil9v3T8oE4zg",
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload,"CDa5DMvC9XSM2YKakG7P3KsmDnKaAk7K")

  res.json({
    signature: signature
  })
}

createRouter.post("/meeting-sign", CreateBlog);



const axios = require("axios");
const token = process.env.TOKEN;
const getMeetings = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Error fetching meetings");
  }
};

const createMeeting = async (req, res) => {
  // app.post("/createMeeting", async (req, res) => {
    const { topic, start_time, type, duration, timezone, agenda } = req.body;

    try {
      const response = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        {
          topic,
          type,
          start_time,
          duration,
          timezone,
          agenda,
          settings: {
            host_video: true,
            participant_video: true,
            join_before_host: false,
            mute_upon_entry: true,
            watermark: false,
            use_pmi: false,
            approval_type: 0,
            audio: "both",
            auto_recording: "none",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const body = response.data;
      console.log(body);
      res.status(200).send({ message: "Meeting created successfully", body });
    } catch (error) {
      console.error("Error", error);
    }
};

// Assuming 'createRouter' is an instance of Express Router
createRouter.get("/getMeetings", getMeetings);
createRouter.post("/createMeeting", createMeeting);