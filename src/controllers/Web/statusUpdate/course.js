const Course = require("../../../models/course");
const { success, error } = require("../../../helpers/response");
const { updateRouter } = require("../../../routes/updateRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')


const UpdateCourse = async (req, res) => {
    const {
        _id,
        type,
        isActive,
    } = req.body;

    let status = await Course.findById({ _id });

    if (!status) {
        return res.status(404).json({ success: false, message: "Update fail" });
    }

    try {
        status.isActive = isActive,
            await status.save();

        return res.send(success("Status Updated", { status }));
    } catch (err) {
        return res.send(error("Fail to update Status"))
    }

};
updateRouter.post("/status", UserAuthMiddleware(), UpdateCourse);

