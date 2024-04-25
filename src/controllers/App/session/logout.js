const UserToken= require("../../../models/userToken");
const {success} = require("../../../helpers/response");
const {UserAuthMiddleware} = require("../../../middleware/AuthMiddleware");
const {ULoginTokenFromRequest} = require("../../../helpers");
const {createRouter} = require("../../../routes/createRouter")

const Logout = async (req, res) => {
    const {userId} = req.body;
    const token = await ULoginTokenFromRequest(req);

    if (userId) {
        await UserToken.destroy({
            where: {userId}
        })
    } else {
        await UserToken.destroy({
            where: {token: token.token}
        })
    }
    return res.send(success("Logout Successfully"));
}
createRouter.post("/app/logout", UserAuthMiddleware(), Logout);
