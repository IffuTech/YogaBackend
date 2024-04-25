const Demo = require("../../../models/demo");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateDemo = async (req, res) => {

  const { title, priorityNo, userId } = req.body;

  let demoVideos;

  if (req.files?.video) {
    demoVideos = await uploadImage(req.files?.video, "demoVideos")
  }
  try {
    const demo = new Demo({
      title: title,
      priorityNo: priorityNo || null,
      userId: userId,
      user: userId,
      isActive:true,
      video: demoVideos || null,
    });

    await demo.save();

    return res.send(success("Demo Videos Created Successfully", { demo }));
  } catch (err) {
    return res.send(error("Fail to create Demo Videos"))
  }

};
createRouter.post("/demo", UserAuthMiddleware(), CreateDemo);
