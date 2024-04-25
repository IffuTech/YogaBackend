const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const User = require("../../../models/user");

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(
      userId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json(error("User not found"));
    }

    return res.status(200).json(success("User soft-deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to soft-delete user. Internal server error."));
  }
};


deleteRouter.patch("/user/:id", UserAuthMiddleware(), DeleteUser);


