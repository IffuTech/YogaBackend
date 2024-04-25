const Faq  = require("../../../models/faq");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Updatefaq = async (req, res) => {
  const {
    _id,
    qa,
    answer,
    priorityNo,
    type,
    isActive,
  } = req.body;

  const faq = await Faq.findOne({_id});
      if (!faq) {
        return res
          .status(404)
          .json({ success: false, message: "faq not found" });
      }
try {

  faq.qa = qa || faq?.qa,
  faq.answer = answer || faq?.answer,
  faq.type = type || faq?.type,
  faq.isActive = isActive || faq?.isActive,
  faq.priorityNo = priorityNo || faq?.priorityNo,
  
  await faq.save();

  return res.send(success("faq Updated", {faq}));
} catch (err) {
  return res.send(error("Fail to update faq"))
}
 
};
updateRouter.post("/faq", UserAuthMiddleware(), Updatefaq);

