const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    video: {
      type: String
    },
    fullName: {
      type: String
    },
    email: {
      type: String
    },
    contact: {
      type: String
    },
    // goalId: {
    //   type: String
    // },
    // goal: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Goal"
    // },
    gender: {
      type: String
    },
    age: {
      type: String
    },
    pincode: {
      type: String
    },
    address: {
      type: String
    },
    state: {
      type: String
    },
    priorityNo: {
      type: Number
    },
    rating: {
      type: String
    },
    verify: {
      type: Boolean
    },
    description: {
      type: String
    },
    // roleId: {
    //   type: String
    // },
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Role"
    // },
    // planId: {
    //   type: String,
    // },
    // plan: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Plan"
    // },
    password: {
      type: String
    },
    isActive: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
userSchema.virtual('Courses', {
  ref: 'Course', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'user', // is equal to foreignField
});
// Set Object and Json property to true. Default is set to false
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
const Tutor = mongoose.model("Tutor", userSchema);

module.exports = Tutor;