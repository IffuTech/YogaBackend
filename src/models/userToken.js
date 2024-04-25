const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)
const UserToken = mongoose.model("UserToken", userSchema);

module.exports = UserToken;   