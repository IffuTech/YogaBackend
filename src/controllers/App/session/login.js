const User = require("../../../models/user");
const UserToken = require("../../../models/userToken");
const  Role = require("../../../models/role");
const {generateToken} = require("../../../helpers");
const {
    error,
    success,
} = require("../../../helpers/response");
const {createRouter} = require("../../../routes/createRouter");
const {validate} = require("../../../helpers/validations");
const {body} = require("express-validator");

const Login = async (req, res) => {
    const {contact} = req.body;
    console.log("body==============",req.body)
    const userLog = await User.findOne({contact})
    if (!userLog) return res.status(400).json(error("User doesn't exists", userLog));
  
    const tok = new UserToken({
        user: userLog._id,
        token: generateToken(userLog),
        type: "login",
    });
    await tok.save();
    const data = await UserToken.findOne({_id: tok._id}).populate({path:"user"});
    return res.send(
        success("Login Successfully", {
            type: "success",
            data
        }) 
    ); 
};
createRouter.post(
    "/app/login",
    validate([
        body("contact").notEmpty().withMessage("contact Number is required")
    ]),
    Login
);
