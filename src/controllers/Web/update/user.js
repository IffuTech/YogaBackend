const User  = require("../../../models/user");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { encryptPassword } = require("../../../helpers");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdateUser = async (req, res) => {
  const {
    _id,
    fullName,
    email,
    goalId,
    planId,
    roleId,
    age, 
    gender,
    pincode,
    address,
    state,
    verify,
    contact,
    isActive,
    password
  } = req.body;
  let userImage;

  if(req.files?.image){
   userImage = await uploadImage(req.files?.image,"userImages")
  }

  const user = await User.findById({_id});
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
try {

   user.image = userImage || user?.image,
   user.fullName = fullName || user?.fullName,
   user.email = email || user?.email, 
   user.goalId = goalId || user?.goalId, 
   user.goal = goalId || user?.goalId, 
   user.planId = planId || user?.planId, 
   user.plan = planId || user?.planId, 
   user.roleId = roleId || user?.roleId, 
   user.role = roleId || user?.roleId, 
   user.age = age || user?.age, 
   user.gender = gender || user?.gender, 
   user.pincode = pincode || user?.pincode, 
   user.address = address || user?.address, 
   user.state = state || user?.state, 
   user.isActive = isActive ,
   user.verify = verify || user?.verify, 
   user.contact = contact || user?.contact,
   user.password = password && encryptPassword(password) || user?.password,
 
  await user.save();

  return res.send(success("User Updated", {user}));
} catch (err) {
  return res.send(error("Fail to update user"))
}
 
};
updateRouter.post("/user", UserAuthMiddleware(), UpdateUser);