const mongoose = require("mongoose");
const demoSchema = new mongoose.Schema({
  title: {
    type: String
  },
  video: {
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
  isActive: {
    type: Boolean,
    default:true
  },
    },
     { timestamps: { createdAt: true, updatedAt: true } }
);
const Demo = mongoose.model("Demo", demoSchema);

module.exports = Demo;