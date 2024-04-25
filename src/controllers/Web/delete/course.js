const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Course = require("../../../models/course");

const DeleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course= await Course.findByIdAndDelete(
      courseId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json(error("course not found"));
    }

    return res.status(200).json(success("Course deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete course. Internal server error."));
  }
};


deleteRouter.patch("/course/:id", UserAuthMiddleware(), DeleteCourse);


