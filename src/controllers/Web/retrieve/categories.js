const Category  = require("../../../models/category");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveCategories = async (req, res) => {
try {
  const categories = await Category.find();
  return res.send(success("Categories Retrieve Successfully", categories));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/categories", UserAuthMiddleware(), RetrieveCategories);
 