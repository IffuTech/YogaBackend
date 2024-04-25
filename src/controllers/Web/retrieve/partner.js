const Tutor  = require("../../../models/tutor");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrievePartner = async (req, res) => {
  const {id} = req.body;
try {
  const partner = await Tutor.findOne({_id:id});
  return res.send(success("Partner Retrieve Successfully", {partner}));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.post("/partner", UserAuthMiddleware(), RetrievePartner);
