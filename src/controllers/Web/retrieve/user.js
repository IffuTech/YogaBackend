const User  = require("../../../models/user");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveUser = async (req, res) => {
  const {id} = req.params;
try {
  const user = await User.findOne({_id:id});
  return res.send(success("User Retrieve Successfully", {user}));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/user/:id", UserAuthMiddleware(), RetrieveUser);
