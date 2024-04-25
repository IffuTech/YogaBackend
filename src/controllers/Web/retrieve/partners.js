const Tutor  = require("../../../models/tutor");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrievePartners = async (req, res) => {
try {
  const partners = await Tutor.find();
  return res.send(success("Partners Retrieve Successfully", partners));
} catch (err) {
  return res.send(error("server error"))
}
 
};
retrieveRouter.get("/partners", UserAuthMiddleware(), RetrievePartners);
