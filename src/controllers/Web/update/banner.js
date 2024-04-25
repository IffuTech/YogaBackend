const Banner  = require("../../../models/banner");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const Updatebanner = async (req, res) => {
  const {
    bannerId,
    title,
    priorityNo,
    isActive
  } = req.body;
//   const {image} = req.files;
console.log(bannerId);
  let bannerImage;

  if(req.files?.image){
   bannerImage = await uploadImage(req.files?.image,"bannerImages")
  }

  const banner = await Banner.findOne({_id:bannerId});
      if (!banner) {
        return res
          .status(404)
          .json({ success: false, message: "banner not found" });
      }
try {

   banner.title = title || banner?.title,
   banner.priorityNo = priorityNo || banner?.priorityNo,
   banner.image = bannerImage || banner?.image,
   banner.isActive = isActive || banner?.isActive,
  
  await banner.save();

  return res.send(success("banner Updated", {banner}));
} catch (err) {
  return res.send(error("Fail to update banner"))
}
 
};
updateRouter.post("/banner", UserAuthMiddleware(), Updatebanner);

