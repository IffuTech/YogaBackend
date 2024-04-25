const mongoose = require("mongoose");
const goalSchema = new mongoose.Schema({
  name: {
    type: String
  },
  content: {
    type: String
  },
  priorityNo: {
    type: String
  },
  userId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  icon: {
    type: String
  },
  isActive: {
    type: Boolean,
    default:true
  },
},
  { timestamps: { createdAt: true, updatedAt: true } }
);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;