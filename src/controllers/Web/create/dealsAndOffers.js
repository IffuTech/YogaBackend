const DealsAndOffers = require("../../../models/dealsAndOffers");
const { success, error } = require("../../../helpers/response");
const { uploadImage } = require("../../../helpers/index");
const { createRouter } = require("../../../routes/createRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateDealsAndOffers = async (req, res) => {
  const { title, userId, priorityNo } = req.body;
  let dealsAndOffersImage;

  if (req.files?.image) {
    dealsAndOffersImage = await uploadImage(req.files?.image, "dealsAndOffers")
  }
  try {
    const dealsAndOffers = new DealsAndOffers({
      title: title,
      userId: userId,
      priorityNo: priorityNo || null,
      isActive:true,
      user: userId,
      image: dealsAndOffersImage || null,
    });

    await dealsAndOffers.save();

    return res.send(success("Deals And Offers Created Successfully", { dealsAndOffers }));
  } catch (err) {
    return res.send(error("Fail to create Deals And Offers"))
  }

};
createRouter.post("/deals-and-offers", UserAuthMiddleware(), CreateDealsAndOffers);
