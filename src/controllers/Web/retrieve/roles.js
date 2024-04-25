const Role  = require("../../../models/role");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Retrieveroles = async (req, res) => {
try {
  const roles = await Role.find();
  return res.send(success("roles Retrieve Successfully", roles));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/roles", UserAuthMiddleware(), Retrieveroles);
 