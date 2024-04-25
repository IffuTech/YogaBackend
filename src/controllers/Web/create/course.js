const Course = require("../../../models/course");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateCourse = async (req, res) => {
  const {
    name,
    price,
    description,
    duration,
    priorityNo,
    category,
    tutorId,
    userId
  } = req.body;
  console.log(JSON.parse(duration));
  let blogImage;

  if (req.files?.image) {
    blogImage = await uploadImage(req.files?.image, "coursesImages")
  }
  const co = await Course.findOne({ name });
  if (co) {
    return res.send(error("Course Name already exists"));
  }
  try {
    const course = new Course({
      name,
      price,
      image: blogImage || "",
      description,
      priorityNo,
      duration: JSON.parse(duration),
      categoryId: category,
      category,
      tutorId,
      tutor: tutorId,
      userId,
      isActive:true,
      user: userId
    });

    await course.save();

    return res.send(success("Course Created Successfully", { course }));
  } catch (err) {
    return res.send(error("Fail to create Course"))
  }

};
createRouter.post("/course", UserAuthMiddleware(), CreateCourse);
