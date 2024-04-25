const Blog = require("../../../models/blog");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateBlog = async (req, res) => {
  const {
    name,
    content,
    userId
  } = req.body;

  let blogImage;

  if (req?.files?.image) {
    blogImage = await uploadImage(req.files?.image, "blogImages")
  }

  try {
    const blog = new Blog({
      name,
      userId: userId,
      user: userId,
      image: blogImage || null,
      description: content,
      isActive:true,
    });

    await blog.save();

    return res.send(success("Blog Created Successfully", { blog }));
  } catch (err) {
    return res.send(error("Fail to create Blog"))
  }

};
createRouter.post("/blog", UserAuthMiddleware(), CreateBlog);
