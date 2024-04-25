const Tutor  = require("../../../models/tutor");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdatePartner = async (req, res) => {
  const {
    _id,
    fullName,
    email,
    contact,
    priorityNo,
    description,
    isActive,
  } = req.body;

  let userImage;
  let userVideo;

  if(req.files?.image){
    userImage = await uploadImage(req.files?.image,"tutorsImages")
  }
  
  if(req.files?.video){
    userVideo = await uploadImage(req.files?.video,"videos")
  }

  const user = await Tutor.findOne({_id});
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Partner not found" });
      }
try {

   user.image = userImage || user?.image,
   user.video = userVideo || user?.video,
   user.fullName = fullName || user?.fullName,
   user.priorityNo = priorityNo || user?.priorityNo,
   user.email = email || user?.email, 
   user.contact = contact || user?.contact,
   user.description = description || user?.description,
   user.isActive = isActive || user?.isActive,
 
  await user.save();

  return res.send(success("Partner Updated", {user}));
} catch (err) {
  return res.send(error("Fail to update partner"))
}
 
};
updateRouter.post("/partner", UserAuthMiddleware(), UpdatePartner);