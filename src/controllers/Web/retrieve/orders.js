const Order  = require("../../../models/order");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveOrders = async (req, res) => {
try {
  const orders = await Order.find();
  return res.send(success("Orders Retrieve Successfully", {orders}));
} catch (err) {
  return res.send(error("server error"))
}
 
};
retrieveRouter.get("/orders", UserAuthMiddleware(), RetrieveOrders);
