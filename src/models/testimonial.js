const mongoose = require("mongoose");
const testimonialSchema = new mongoose.Schema({
  title: {
    type: String
  },
  type: {
    type: String
  },
  priorityNo: {
    type: Number
  },
  userId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image: {
    type: String
  },
  isActive: {
    type: Boolean,
    default:true
  },
},
  { timestamps: { createdAt: true, updatedAt: true } }
);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;