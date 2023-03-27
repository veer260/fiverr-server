const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    image: {
      required: false,
      type: String,
    },
    country: {
      required: true,
      type: String,
    },
    phoneNo: {
      required: false,
      type: String,
    },
    desc: {
      required: false,
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
