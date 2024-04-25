const mongoose = require("mongoose");
const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    code: {
      type: String
    },
    isActive: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
const Permission = mongoose.model("permission", permissionSchema);

module.exports = Permission;