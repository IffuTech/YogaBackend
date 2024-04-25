const Category = require("../../../models/category");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const category = await Category.findOne({_id:id});
        return res.send(success("Category Retrieve Successfully", category));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/category", UserAuthMiddleware(), RetrieveCategory);
