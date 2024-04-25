const User  = require("../../../models/user");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { encryptPassword } = require("../../../helpers");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateUser = async (req, res) => {
  const {
    fullName,
    email,
    contact,
    age,
    gender,
    pincode,
    address,
    state,
    goalId,
    roleId,
    planId,
    password,
  } = req.body;
  let userImage;
// const p = encryptPassword(password)
// console.log(p);
  if(req.files?.image){
   userImage = await uploadImage(req.files?.image,"userImages")
  }

  const phone = await User.findOne({contact});
  if (phone) {
    return res.send(error("Contact No. already exists"));
  }

  const existEmail = await User.findOne({email});
  if (existEmail) {
    return res.send(error("Email already exists"));
  }
try {
  const user = new User({
    image:userImage || null,
    fullName,
    email, 
    contact,
    age,
    gender,
    pincode,
    address,
    state,
    goalId,
    goal:goalId,
    roleId,
    role:roleId,
    planId,
    plan:planId,
    // statusId:2,
    // isActive:true,
    password: encryptPassword(password)
  });
 
  await user.save();
  

  return res.send(success("User Created Successfully", {user}));
} catch (err) {
  return res.send(error("Fail to create user"))
} 
 
};
createRouter.post("/user", CreateUser);
