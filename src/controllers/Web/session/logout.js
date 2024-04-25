const UserToken= require("../../../models/userToken");
const {success} = require("../../../helpers/response");
const {UserAuthMiddleware} = require("../../../middleware/AuthMiddleware");
const {ULoginTokenFromRequest} = require("../../../helpers");
const {deleteRouter} = require("../../../routes/deleteRouter");

const Logout = async (req, res) => {
    const {userId} = req.body;
    // const {token} = await ULoginTokenFromRequest(req);

    if (userId) {
        await UserToken.deleteOne({
          userId
        })
    } else {
        // await UserToken.deleteOne({
        //    token: token
        // })
    }
    return res.send(success("Logout Successfully"));
}
deleteRouter.delete("/logout", 
// UserAuthMiddleware(), 
Logout);
