const Role = require("../../../models/role");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Retrieverole = async (req, res) => {
    const { id } = req.body;
    try {
        const role = await Role.findOne({_id:id});
        return res.send(success("role Retrieve Successfully", role));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/role", UserAuthMiddleware(), Retrieverole);
