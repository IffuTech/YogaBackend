const Goal  = require("../../../models/goal");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveBlogs = async (req, res) => {
try {
  const goals = await Goal.find();
  return res.send(success("goals Retrieve Successfully", goals));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/goals",
//  UserAuthMiddleware(),
  RetrieveBlogs);
 