const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const newError = require("../utils/createError");

const register = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    console.log(req.body);
    const hashedPwd = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      ...rest,
      password: hashedPwd,
    });
    return res.status(201).json("successfully registered a new user");
  } catch (error) {
    // throw newError('cannot register a user', 500);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    console.log("tried");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(newError("user not found!", 404));
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return next(newError("check Email or Password!", 400));
    }

    const token = jwt.sign(
      { email, id: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 6,
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
    });
    const { password: userPassword, ...rest } = user._doc;
    return res.json({
      ...rest,
    });

    // res.setC
  } catch (error) {
    console.log("ddbujuj");
    next(error);
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("access-token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

module.exports = {
  register,
  login,
  logout,
};
