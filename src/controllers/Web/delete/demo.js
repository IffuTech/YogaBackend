const { success, error } = require("../../../helpers/response");
const { deleteRouter } = require("../../../routes/deleteRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware');
const Demo = require("../../../models/demo");

const DeleteDemo = async (req, res) => {
  try {
    const demoId = req.params.id;

    const demo = await Demo.findByIdAndDelete(
      demoId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!demo) {
      return res.status(404).json(error("Demo not found"));
    }

    return res.status(200).json(success("Demo deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(error("Failed to delete Demo. Internal server error."));
  }
};


deleteRouter.patch("/demo/:id", UserAuthMiddleware(), DeleteDemo);


