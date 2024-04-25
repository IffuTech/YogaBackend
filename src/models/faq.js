const mongoose = require("mongoose");
const faqSchema = new mongoose.Schema({
  qa: {
    type: String
  },
  answer: {
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
  type: {
    type: String
  },
  isActive: {
    type: Boolean,
    default:true
  },
},
  { timestamps: { createdAt: true, updatedAt: true } }
);
const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;