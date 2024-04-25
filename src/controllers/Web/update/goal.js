const Goal = require("../../../models/goal");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { uploadImage } = require("../../../helpers/index");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const UpdateGoal = async (req, res) => {
  const {
    goalId,
    name,
    priorityNo,
    content,
    isActive,
  } = req.body;

  let goalIcon;

  if (req?.files?.icon) {
    goalIcon = await uploadImage(req?.files?.icon, "goalIcons")
  }

  const goal = await Goal.findOne({ _id: goalId });
  if (!goal) {
    return res
      .status(404)
      .json({ success: false, message: "Goal not found" });
  }
  try {
      goal.name = name || goal?.name,
      goal.content = content || goal?.content,
      goal.priorityNo = priorityNo || goal?.priorityNo,
      goal.icon = goalIcon || goal?.icon,
      goal.isActive = isActive || goal?.isActive,

      await goal.save();

    return res.send(success("Goal Updated", { goal }));
  } catch (err) {
    return res.send(error("Fail to update Goal"))
  }

};
updateRouter.post("/goal", 
// UserAuthMiddleware(), 
UpdateGoal);

