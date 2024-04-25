const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Testimonial = require("../../../models/testimonial");

const DeleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;

    const testimonial = await Testimonial.findByIdAndDelete(
      testimonialId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json(error("Testimonial not found"));
    }

    return res.status(200).json(success("Testimonial deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Testimonial. Internal server error."));
  }
};


deleteRouter.patch("/testimonial/:id", UserAuthMiddleware(), DeleteTestimonial);


