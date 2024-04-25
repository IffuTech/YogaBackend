const Testimonial = require("../../../models/testimonial");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveTestimonials = async (req, res) => {
  const { type } = req.body;
  let where = {};
  if (type) {
    where = {
      type: type
    }
  }
  try {
    const testimonials = await Testimonial.find({...where});
    return res.send(success("testimonials Retrieve Successfully", testimonials));
  } catch (err) {
    return res.send(error("server error"))
  }

};
retrieveRouter.get("/testimonials", UserAuthMiddleware(), RetrieveTestimonials);
