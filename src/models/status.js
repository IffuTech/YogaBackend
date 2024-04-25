const mongoose = require("mongoose");
const statusSchema = new mongoose.Schema({
  name: {
    type: String
  },
  userId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
},
{ timestamps: { createdAt: true, updatedAt: true } }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;