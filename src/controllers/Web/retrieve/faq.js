const Faq = require("../../../models/faq");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Retrievefaq = async (req, res) => {
    const { id } = req.body;
    try {
        const faq = await Faq.findOne({_id:id});
        return res.send(success("faqs Retrieve Successfully", faq));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/faq", UserAuthMiddleware(), Retrievefaq);
