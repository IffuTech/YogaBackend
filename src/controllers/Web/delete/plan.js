const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Plan = require("../../../models/plan");

const DeletePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    const plan = await Plan.findByIdAndDelete(
      planId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json(error("Plan not found"));
    }

    return res.status(200).json(success("Plan deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete plan. Internal server error."));
  }
};


deleteRouter.patch("/plan/:id", UserAuthMiddleware(), DeletePlan);


