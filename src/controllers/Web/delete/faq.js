const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Faq = require("../../../models/faq");

const DeleteFaq = async (req, res) => {
  try {
    const faqId = req.params.id;

    const faq = await Faq.findByIdAndDelete(
      faqId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json(error("Faq not found"));
    }

    return res.status(200).json(success("Faq deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Faq. Internal server error."));
  }
};


deleteRouter.patch("/faq/:id", UserAuthMiddleware(), DeleteFaq);


