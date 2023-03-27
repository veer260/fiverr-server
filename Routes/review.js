const {
  create,
  get,
  deleteReview,
} = require("../controllers/reviewController");
const express = require("express");
const verifyToken = require("../middlewares/token");
const router = express.Router();

router.get("/:gigId", get);
router.post("/", verifyToken, create);
router.delete("/:id", deleteReview);

module.exports = router;
