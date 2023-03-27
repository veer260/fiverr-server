// const {
//   createGig,
//   deleteGig,
//   getGig,
//   getGigs,
// } = require("../controllers/gigController.js");

const {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} = require("../controllers/gigController");
const verifyToken = require("../middlewares/token.js");
const express = require("express");

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

module.exports = router;
