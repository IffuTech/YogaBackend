const Role  = require("../../../models/role");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Updaterole = async (req, res) => {
  const {
    _id,
    name,
    isActive
  } = req.body;

  const role = await Role.findOne({_id});
      if (!role) {
        return res
          .status(404)
          .json({ success: false, message: "role not found" });
      }
try {

  role.name = name || role?.name,
  role.isActive = isActive || role?.isActive,
  
  await role.save();

  return res.send(success("role Updated", {role}));
} catch (err) {
  return res.send(error("Fail to update role"))
}
 
};
updateRouter.post("/role", UserAuthMiddleware(), Updaterole);

