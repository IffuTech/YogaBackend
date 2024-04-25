const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Banner = require("../../../models/banner");

const DeleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;

    const banner= await Banner.findByIdAndDelete(
      bannerId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!banner) {
      return res.status(404).json(error("Banner not found"));
    }

    return res.status(200).json(success("Banner deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Banner. Internal server error."));
  }
};


deleteRouter.patch("/banner/:id", UserAuthMiddleware(), DeleteBanner);


