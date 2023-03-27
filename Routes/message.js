const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/token");
const {
  getMessages,
  createMessage,
} = require("../controllers/messageController");

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);
module.exports = router;
