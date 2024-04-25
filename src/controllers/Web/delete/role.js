const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Role = require("../../../models/role");

const DeleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const role = await Role.findByIdAndDelete(
      roleId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!role) {
      return res.status(404).json(error("Role not found"));
    }

    return res.status(200).json(success("role deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Role. Internal server error."));
  }
};


deleteRouter.patch("/role/:id", UserAuthMiddleware(), DeleteRole);


