const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
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
      isActive: {
        type: Boolean,
        default:true
      }
    },
     { timestamps: { createdAt: true, updatedAt: true } }
);
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;