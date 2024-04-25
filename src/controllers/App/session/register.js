const User  = require("../../../models/user");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const {validate} = require("../../../helpers/validations");
const {body} = require("express-validator");

const CreateUser = async (req, res) => {
  const {
    contact
  } = req.body;
 
  const phone = await User.findOne({contact});
  if (phone) {
    return res.status(403).json(error("Contact No. already exists"));
  }

try {
  const user = new User({
    contact,
    statusId:1
  });
 
  await user.save();

  return res.send(success("Register Successfully", {user}));
} catch (err) {
  return res.status(500).json(error("Fail to create user"))
}
 
};
createRouter.post("/app/register",validate([
  body("contact").notEmpty().withMessage("contact Number is required")
]), CreateUser);
