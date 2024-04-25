const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Goal = require("../../../models/goal");

const DeleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;

    const goal = await Goal.findByIdAndDelete(
      goalId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json(error("Goal not found"));
    }

    return res.status(200).json(success("Goal deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Goal. Internal server error."));
  }
};


deleteRouter.patch("/goal/:id", UserAuthMiddleware(), DeleteGoal);


