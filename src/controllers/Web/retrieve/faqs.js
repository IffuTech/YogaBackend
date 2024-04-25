const Faq  = require("../../../models/faq");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Retrievefaqs = async (req, res) => {
  const {type} = req.body;
  let where = {};
  if(type) where ={ type}
try {
  const faqs = await Faq.find({...where});
  return res.send(success("faqs Retrieve Successfully", faqs));
} catch (err) {
    return res.send(error("server error"))
}
 
};
retrieveRouter.get("/faqs", UserAuthMiddleware(), Retrievefaqs);
 