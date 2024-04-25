const Plan = require("../../../models/plan");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Handler = async (req, res) => {
    const {
        name,
        price,
        userId,
        isActive
    } = req.body;
    try {
        const plan = new Plan({
            name,
            price,
            userId,
            user: userId,
            isActive:false,
        });

        await plan.save();

        return res.send(success("Plan Created Successfully", { plan }));
    } catch (err) {
        return res.send(error("Fail to create Plan"))
    }

};
createRouter.post("/plan", UserAuthMiddleware(), Handler);
