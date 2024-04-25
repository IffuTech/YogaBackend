const Blog = require("../../../models/blog");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveBlog = async (req, res) => {
    const { id } = req.body;
    try {
        const blog = await Blog.findOne({_id:id});
        return res.send(success("Blogs Retrieve Successfully", blog));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/blog", UserAuthMiddleware(), RetrieveBlog);
