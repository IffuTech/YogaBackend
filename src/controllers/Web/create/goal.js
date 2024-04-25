const Goal = require("../../../models/goal");
const { success, error } = require("../../../helpers/response");
const { createRouter } = require("../../../routes/createRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const CreateGoal = async (req, res) => {
  const {
    name,
    content,
    priorityNo,
    userId
  } = req.body;

  let goalIcon;

  if (req?.files?.icon) {
    goalIcon = await uploadImage(req?.files?.icon, "goalIcons")
  }

  const goalName = await Goal.findOne({ name });
  if (goalName) {
    return res.send(error("Goal Name already exists"));
  }
  try {
    const goal = new Goal({
      name,
      content,
      priorityNo,
      userId: userId,
      user: userId,
      isActive:false,
      icon: goalIcon || null
    });

    await goal.save();

    return res.send(success("Goal Created Successfully", { goal }));
  } catch (err) {
    return res.send(error("Fail to create Goal"))
  }

};
createRouter.post("/goal", 
// UserAuthMiddleware(), 
CreateGoal);
