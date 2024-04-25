const Faq = require("../../../models/faq");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateFaq = async (req, res) => {
  const {
    qa,
    answer,
    type,
    priorityNo,
    userId
  } = req.body;
  try {
    const faq = new Faq({
      qa,
      answer,
      type,
      priorityNo: priorityNo || null,
      userId,
      // isActive:true,
      user: userId,
    });

    await faq.save();

    return res.send(success("Faq Created Successfully", { faq }));
  } catch (err) {
    return res.send(error("Fail to create Faq"))
  }

};
createRouter.post("/faq", UserAuthMiddleware(), CreateFaq);
