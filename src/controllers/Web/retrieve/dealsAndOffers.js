const DealsAndOffers  = require("../../../models/dealsAndOffers");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveDealsAndOffers = async (req, res) => {
try {
  const dealsAndOffers = await DealsAndOffers.find();
  return res.send(success("Deals And Offers Retrieve Successfully", dealsAndOffers));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/deals-and-offers", UserAuthMiddleware(), RetrieveDealsAndOffers);
 