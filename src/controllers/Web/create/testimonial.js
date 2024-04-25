const Testimonial = require("../../../models/testimonial");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Createtestimonial = async (req, res) => {
  const { type, title, userId } = req.body;

  let testimonialImage;

  if (req.files?.image) {
    testimonialImage = await uploadImage(req.files?.image, "testimonialImages")
  }
  try {
    const testimonial = new Testimonial({
      image: testimonialImage || null,
      type: type,
      title: title,
      userId,
      isActive:false,
      user: userId,
    });

    await testimonial.save();

    return res.send(success("testimonial Created Successfully", { testimonial }));
  } catch (err) {
    return res.send(error("Fail to create testimonial"))
  }

};
createRouter.post("/testimonial", UserAuthMiddleware(), Createtestimonial);
