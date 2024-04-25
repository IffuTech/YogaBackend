const Plan  = require("../../../models/plan");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Updateplan = async (req, res) => {
  const {
    _id,
    name,
    price,
    isActive
  } = req.body;

  const plan = await Plan.findOne({_id});
      if (!plan) {
        return res
          .status(404)
          .json({ success: false, message: "plan not found" });
      }
try {

  plan.name = name || plan?.name,
  plan.price = price || plan?.price,
  plan.isActive = isActive || plan?.isActive,
  
  await plan.save();

  return res.send(success("plan Updated", {plan}));
} catch (err) {
  return res.send(error("Fail to update plan"))
}
 
};
updateRouter.post("/plan", UserAuthMiddleware(), Updateplan);

