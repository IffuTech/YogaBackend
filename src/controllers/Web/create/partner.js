const Tutor = require("../../../models/tutor");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { encryptPassword } = require("../../../helpers");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreatePartner = async (req, res) => {
  const {
    fullName,
    email,
    contact,
    description,
    priorityNo,
    roleId,
    password
  } = req.body;
  console.log(req.body)
  let userImage;
  let video;

  const phone = await Tutor.findOne({ contact });
  if (phone) {
    return res.send(error("Contact No. already exists"));
  }

  const existEmail = await Tutor.findOne({ email });
  if (existEmail) {
    return res.send(error("Email already exists"));
  }

  if (req?.files?.image) {
    userImage = await uploadImage(req?.files?.image, "tutorsImages")
  }
  console.log("imagesssssssssssssssss",req.files);


  if (req?.files?.video) {
    video = await uploadImage(req.files?.video, "videos")
  }

  try {
    const partner = new Tutor({
      image: userImage,
      video: video,
      fullName,
      priorityNo,
      email,
      contact,
      description,
      roleId,
      isActive:true,
      password: password && encryptPassword(password)
    });

    await partner.save();
    console.log(partner, "pas")
    return res.send(success("Partner Created Successfully", { partner }));
  } catch (err) {
    return res.send(error("Fail to create partner"))
  }

};
createRouter.post("/partner", UserAuthMiddleware(), CreatePartner);
