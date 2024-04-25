const User = require("../../../models/user");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveUsers = async (req, res) => {
  const { state, gender, startDate, endDate } = req.query;
  let where = {};

  if (state && gender) {
    where = {
      $and: [{ state }, { gender }]
    }
  }

  if (startDate && endDate) {
    where = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }
  }
  try {
    const users = await User.find({ ...where }).populate({ path: "role" }).populate({ path: "plan" });
    return res.send(success("Users Retrieve Successfully", users));
  } catch (err) {
    return res.send(error("server error"))
  }

};
retrieveRouter.get("/users", UserAuthMiddleware(), RetrieveUsers);
