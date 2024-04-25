const Blog  = require("../../../models/blog");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveBlogs = async (req, res) => {
try {
  const blogs = await Blog.find();
  return res.send(success("Blogs Retrieve Successfully", blogs));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/blogs", UserAuthMiddleware(), RetrieveBlogs);
 