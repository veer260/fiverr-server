// import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) return next(createError(401, "You are not authenticated!"));

//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.userId = payload.id;
//     req.isSeller = payload.isSeller;
//     next();
//   });
// };

const jwt = require("jsonwebtoken");
const newError = require("../utils/createError");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log(token);
  if (!token) {
    return next(newError("token is not valid", 403));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    const { id, email, isSeller } = payload;
    // console.log(typeof +id, email, isSeller);
    req.id = id;
    req.email = email;
    req.isSeller = isSeller;
    next();
  });
};

module.exports = verifyToken;
