const Role = require("../../../models/role");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Handler = async (req, res) => {
  const {
    name,
    userId,
  } = req.body;

  try {
  
    const userRolesCount = await Role.countDocuments({ userId });

    if (userRolesCount >= 3) {
      return res.send(error("Cannot add more than 3 roles for the user"));
    }


    const existingRole = await Role.findOne({ name, userId });
    if (existingRole) {
      return res.send(error("Role with the same name already exists for the user"));
    }

    const globalExistingRole = await Role.findOne({ name });
    if (globalExistingRole) {
      return res.send(error("Role with the same name already exists globally"));
    }

    const role = new Role({
      name,
      userId,
      user: userId,
      // isActive: true,
    });

    await role.save();

    return res.send(success("Role Created Successfully", { role }));
  } catch (err) {
    return res.send(error(`Failed to create role: ${err.message}`))
  }
};

createRouter.post("/role", UserAuthMiddleware(), Handler);
