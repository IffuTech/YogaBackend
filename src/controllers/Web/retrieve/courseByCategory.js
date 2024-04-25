const Course = require("../../../models/course");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveCourse = async (req, res) => {
    const { category } = req.body;
    try {
        const course = await Course.find({categoryId:category});
        return res.send(success("Course Retrieve Successfully", course));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/course-by-category", UserAuthMiddleware(), RetrieveCourse);
