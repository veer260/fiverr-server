const User = require("../models/user");
const newError = require("../utils/createError");
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUserById,
};
