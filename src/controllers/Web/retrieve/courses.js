const Course  = require("../../../models/course");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveCourses = async (req, res) => {
try {
  const courses = await Course.find().populate({path:"user"}).populate({path:"category"}).populate({path:"tutor"});
  return res.send(success("Courses Retrieve Successfully", courses));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/courses", UserAuthMiddleware(), RetrieveCourses);
 