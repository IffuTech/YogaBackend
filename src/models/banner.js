const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  image: {
    type: String
  },
  title: {
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
    type: Boolean
  },
},
  { timestamps: { createdAt: true, updatedAt: true } }
);
const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;