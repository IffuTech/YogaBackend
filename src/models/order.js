const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  courseName: {
    type: String
  },
  orderId: {
    type: String
  },
  userId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date
  },
  price: {
    type: String
  },
  status: {
    type: String
  },
    },
     { timestamps: { createdAt: true, updatedAt: true } }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;