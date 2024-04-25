const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Blog = require("../../../models/blog");

const DeleteBlog= async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findByIdAndDelete(
      blogId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json(error("Blog not found"));
    }

    return res.status(200).json(success("Blog deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Blog. Internal server error."));
  }
};

deleteRouter.patch("/blog/:id", UserAuthMiddleware(), DeleteBlog);