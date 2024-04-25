const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Category = require("../../../models/category");

const DeleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByIdAndDelete(
      categoryId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!category) {
      return res.status(404).json(error("Category not found"));
    }

    return res.status(200).json(success("category deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete category. Internal server error."));
  }
};


deleteRouter.patch("/category/:id", UserAuthMiddleware(), DeleteCategory);


