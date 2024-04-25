const UserToken = require("../models/userToken");
const User = require("../models/user");
const {error} = require("../helpers/response");
const jwt = require("jsonwebtoken")

// ---------------------USER-----------------
const UserAuthMiddleware = () => async (req, res, next) => {
    const errorMessage = "Unauthorized";
    const code = 401;
    let token_id = req.headers.authorization || req.query?.token_id || "";
    token_id = token_id.replace("Bearer ", "");
    if (!token_id) return res.status(401).send(error(errorMessage));
    try {
        const user = jwt.verify(token_id, process.env.APP_TOKEN_KEY);
    } catch (e) {
        // console.log(token_id);
        return res.status(401).send(error(errorMessage))
    }

    const token = await UserToken.findOne({token: token_id}).populate({path:"user"});
    // console.log(token);
    if (!token || !token.user) {
        return res.status(401).send(error(errorMessage, code));
    }
    req.login_token = token;
    next();
};
module.exports = {
    UserAuthMiddleware
};
