const Banner = require("../../../models/banner");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Createbanner = async (req, res) => {
  const { title, priorityNo, userId } = req.body;
  let bannerImage;

  if (req.files?.image) {
    bannerImage = await uploadImage(req.files?.image, "bannerImages")
  }
  try {
    const banner = new Banner({
      image: bannerImage || null,
      title: title,
      priorityNo: priorityNo || null,
      isActive: true,
      userId: userId,
      user: userId,
    });

    await banner.save();

    return res.send(success("Banner Created Successfully", { banner }));
  } catch (err) {
    return res.send(error("Fail to create Banner"))
  }

};
createRouter.post("/banner", UserAuthMiddleware(), Createbanner);
