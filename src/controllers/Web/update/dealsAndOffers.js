const DealsAndOffers  = require("../../../models/dealsAndOffers");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdatedealsAndOffers = async (req, res) => {
  const {
    dealsAndOffersId,
    title,
    priorityNo,
    isActive
  } = req.body;
//   const {image} = req.files;
console.log(dealsAndOffersId);
  let dealsAndOffersImage;

  if(req.files?.image){
   dealsAndOffersImage = await uploadImage(req.files?.image,"dealsAndOffers")
  }

  const dealsAndOffers = await DealsAndOffers.findOne({_id:dealsAndOffersId});
      if (!dealsAndOffers) {
        return res
          .status(404)
          .json({ success: false, message: "dealsAndOffers not found" });
      }
try {

   dealsAndOffers.title = title || dealsAndOffers?.title,
   dealsAndOffers.priorityNo = priorityNo || dealsAndOffers?.priorityNo,
   dealsAndOffers.image = dealsAndOffersImage || dealsAndOffers?.image,
   dealsAndOffers.isActive = isActive || dealsAndOffers?.isActive,
  
  await dealsAndOffers.save();

  return res.send(success("DealsAndOffers Updated", {dealsAndOffers}));
} catch (err) {
  return res.send(error("Fail to update dealsAndOffers"))
}
 
};
updateRouter.post("/deals-and-offer", UserAuthMiddleware(), UpdatedealsAndOffers);

