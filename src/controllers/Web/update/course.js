const Course  = require("../../../models/course");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')


const UpdateCourse = async (req, res) => {
  const {
    _id,
    name,
    price,
    description,
    priorityNo,
    duration,
    category,
    isActive,
  } = req.body;
  let blogImage;

  if(req.files?.image){
   blogImage = await uploadImage(req.files?.image,"coursesImages")
  }
  const course = await Course.findById({_id});
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      }
try {

   course.name = name || course?.name,
   course.image = blogImage || course?.image,
   course.price = price || course?.price, 
   course.description = description || course?.description, 
   course.priorityNo = priorityNo || course?.priorityNo, 
   course.duration = JSON.parse(duration) || JSON.parse(course?.duration),
   course.categoryId = category || course?.category,
   course.category = category || course?.category,
   course.isActive = isActive || course?.isActive,
 
  await course.save();

  return res.send(success("Course Updated", {course}));
} catch (err) {
  return res.send(error("Fail to update Course"))
}
 
};
updateRouter.post("/course", UserAuthMiddleware(), UpdateCourse);

