const Banner  = require("../../../models/banner");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveBanner = async (req, res) => {
try {
  const banner = await Banner.find();
  return res.send(success("Banners Retrieve Successfully", banner));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/banners", UserAuthMiddleware(), RetrieveBanner);
 