const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  image: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  },
  duration: [{ type: Object }],
  priorityNo: {
    type: Number
  },
  startDate: {
    type: Date
  },
  sessionDuration: {
    type: String
  },
  tutorId: {
    type: String
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },
  userId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  categoryId: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  isActive: {
    type: Boolean,
    default:true
  },
},
  { timestamps: { createdAt: true, updatedAt: true } }
);
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;