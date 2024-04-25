const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Deal = require("../../../models/dealsAndOffers");

const DeleteDeals = async (req, res) => {
  try {
    const dealId = req.params.id;

    const deal = await Deal.findByIdAndDelete(
      dealId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!deal) {
      return res.status(404).json(error("Deals not found"));
    }

    return res.status(200).json(success("Deals deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Deals. Internal server error."));
  }
};


deleteRouter.patch("/deals/:id", UserAuthMiddleware(), DeleteDeals);


