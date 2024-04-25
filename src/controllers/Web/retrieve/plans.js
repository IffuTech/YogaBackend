const Plan  = require("../../../models/plan");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Retrieveplans = async (req, res) => {
try {
  const plans = await Plan.find();
  return res.send(success("plans Retrieve Successfully", plans));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/plans", UserAuthMiddleware(), Retrieveplans);
 