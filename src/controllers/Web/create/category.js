const Category = require("../../../models/category");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateCategory = async (req, res) => {
  const {
    name,
    priorityNo,
    userId
  } = req.body;

  let categoryImage;

  if (req.files?.image) {
    categoryImage = await uploadImage(req.files?.image, "categoryImages")
  }

  try {
    const category = new Category({
      name,
      priorityNo,
      userId: userId,
      user: userId, 
      isActive: true,
      image: categoryImage || null,
    });

    await category.save();

    return res.send(success("Category Created Successfully", { category }));
  } catch (err) {
    return res.send(error("Fail to create Category"))
  }

};
createRouter.post("/category", UserAuthMiddleware(), CreateCategory);
