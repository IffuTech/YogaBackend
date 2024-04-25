const Demo  = require("../../../models/demo");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveDemos = async (req, res) => {
try {
  const demos = await Demo.find();
  return res.send(success("Demos Retrieve Successfully", demos));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/demos", UserAuthMiddleware(), RetrieveDemos);
 