const mongoose = require("mongoose");
const planSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  userId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isActive: {
    type: Boolean,
    default:true
  },
    },
     { timestamps: { createdAt: true, updatedAt: true } }
);
const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;