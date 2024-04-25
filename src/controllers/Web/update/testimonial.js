const Testimonial  = require("../../../models/testimonial");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Updatetestimonial = async (req, res) => {
  const {
    testimonialId,
    title,
    priorityNo,
    type,
    isActive
  } = req.body;
//   const {image} = req.files;
console.log(testimonialId);
  let testimonialImage;

  if(req.files?.image){
   testimonialImage = await uploadImage(req.files?.image,"testimonialImages")
  }

  const testimonial = await Testimonial.findOne({_id:testimonialId});
      if (!testimonial) {
        return res
          .status(404)
          .json({ success: false, message: "testimonial not found" });
      }
try {

   testimonial.title = title || testimonial?.title,
   testimonial.type = type || testimonial?.type,
   testimonial.priorityNo = priorityNo || testimonial?.priorityNo,
   testimonial.image = testimonialImage || testimonial?.image,
   testimonial.isActive = isActive || testimonial?.isActive,
  
  await testimonial.save();

  return res.send(success("testimonial Updated", {testimonial}));
} catch (err) {
  return res.send(error("Fail to update testimonial"))
}
 
};
updateRouter.post("/testimonial", UserAuthMiddleware(), Updatetestimonial);

