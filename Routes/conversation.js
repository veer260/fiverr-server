const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/token");
const {
  getConversations,
  getSingleConversation,
  createConversation,
  updateConversation,
} = require("../controllers/conversationController");

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

module.exports = router;
