const User  = require("../../../models/user");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdateUser = async (req, res) => {
  const {
    userId,
    fullName,
    email,
    goalId,
    age,
    verify,
    contact,
  } = req.body;

  const user = await User.findById({_id:userId});
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
try {

   user.fullName = fullName || user?.fullName,
   user.email = email || user?.email, 
   user.goalId = goalId || user?.goalId, 
   user.age = age || user?.age, 
   user.verify = verify || user?.verify, 
   user.contact = contact || user?.contact,
 
  await user.save();

  return res.send(success("User Updated", {user}));
} catch (err) {
  return res.send(error("Fail to update user"))
}
 
};
updateRouter.post("/app/user",UserAuthMiddleware(), UpdateUser);

