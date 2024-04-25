const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Tutor = require("../../../models/tutor");

const DeleteTutor = async (req, res) => {
  try {
    const tutorId = req.params.id;

    const tutor = await Tutor.findByIdAndDelete(
      tutorId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!tutor) {
      return res.status(404).json(error("Tutor not found"));
    }

    return res.status(200).json(success("Tutor deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Tutor. Internal server error."));
  }
};


deleteRouter.patch("/tutor/:id", UserAuthMiddleware(), DeleteTutor);


