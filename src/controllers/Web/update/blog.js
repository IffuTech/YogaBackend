const Blog  = require("../../../models/blog");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdateBlog = async (req, res) => {
  const {
    blogId,
    name,
    description,
    isActive,
  } = req.body;
  // const {image} = req.files;

  let blogImage;

  if(req.files?.image){
   blogImage = await uploadImage(req.files?.image,"blogImages")
  }

  const blog = await Blog.findById({_id:blogId});
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }
try {

   blog.name = name || blog?.name,
   blog.image = blogImage || blog?.image, 
   blog.isActive = isActive || blog?.isActive, 
   blog.description = description || blog?.description,
  
  await blog.save();

  return res.send(success("Blog Updated", {blog}));
} catch (err) {
  return res.send(error("Fail to update Blog"))
}
 
};
updateRouter.post("/blog", UserAuthMiddleware(), UpdateBlog);

