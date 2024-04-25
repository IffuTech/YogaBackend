const Plan = require("../../../models/plan");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Retrieveplan = async (req, res) => {
    const { id } = req.body;
    try {
        const plan = await Plan.findOne({_id:id});
        return res.send(success("plan Retrieve Successfully", plan));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/plan", UserAuthMiddleware(), Retrieveplan);
