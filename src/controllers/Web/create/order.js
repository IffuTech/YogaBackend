const Order = require("../../../models/order");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateOrder = async (req, res) => {
  const {
    orderId,
    courseId,
    userId,
    date,
    price,
  } = req.body;

  const phone = await Order.findOne({ orderId });
  if (phone) {
    return res.send(error("Order Id already exists"));
  }
  try {
    const order = new Order({
      orderId,
      courseId,
      userId,
      user: userId,
      date,
      price,
      statusId: 2
    });

    await order.save();

    return res.send(success("Order Created Successfully", { order }));
  } catch (err) {
    return res.send(error("Fail to create order"))
  }

};
createRouter.post("/order", UserAuthMiddleware(), CreateOrder);
