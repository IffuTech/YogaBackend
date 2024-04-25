const Category = require("../../../models/category");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdateCategory = async (req, res) => {
  const {
    categoryId,
    name,
    isActive,
    priorityNo,
  } = req.body;
  console.log(categoryId, "sdsdsdsadasdsad")
  let categoryImage;

  if (!!req.files?.image) {
    categoryImage = await uploadImage(req.files?.image, "categoryImages")
  }

  const category = await Category.findOne({ _id: categoryId });
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "category not found" });
  }
  try {
    category.name = name || category?.name,
      category.priorityNo = priorityNo || category?.priorityNo,
      category.isActive = isActive 
      category.image = categoryImage || category?.image || null,
      await category.save();

    return res.send(success("category Updated", { category }));
  } catch (err) {
    return res.send(error("Fail to update category", err))
  }

};
updateRouter.post("/category", UserAuthMiddleware(), UpdateCategory);

