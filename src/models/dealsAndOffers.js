const mongoose = require("mongoose");
const dealsAndOffersSchema = new mongoose.Schema({
  title: {
    type: String
  },
  image: {
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
const DealsAndOffers = mongoose.model("DealsAndOffers", dealsAndOffersSchema);

module.exports = DealsAndOffers;