const User = require("../../../models/user");
const UserToken = require("../../../models/userToken");
const Role = require("../../../models/role");
const { matchPassword, generateToken } = require("../../../helpers");
const {
    error,
    success,
} = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { validate } = require("../../../helpers/validations");
const { body } = require("express-validator");

const Login = async (req, res) => {
    const { contact, password } = req.body;
    const userLog = await User.findOne({ contact })
    if (!userLog) return res.status(403).json(error("User doesn't exists", userLog));
    if (!matchPassword(userLog.password, password))
        return res.status(406).json(error("Password doesn't match"));
    const tok = new UserToken({
        user: userLog._id,
        token: generateToken(userLog),
        type: "login",
    });
    await tok.save();
    const data = await UserToken.findOne({ _id: tok._id }).populate({ path: "user", populate: { path: "role" } });
    if (data) return res.status(200).json(success("User Login Successfully", data));
    else return res.status(500).json(error("Login failed"));
};
createRouter.post(
    "/login",
    validate([
        body("contact").notEmpty().withMessage("contact Number is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ]),
    Login
);
