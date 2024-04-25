const mongoose = require("mongoose");
const userPermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: String
    },
    permissionId: {
      type: String
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
const UserPermission = mongoose.model("userPermission", userPermissionSchema);

module.exports = UserPermission;