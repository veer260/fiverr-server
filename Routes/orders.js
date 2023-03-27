const express = require("express");
const verifyToken = require("../middlewares/token");
const router = express.Router();
const { getOrders, createOrder } = require("../controllers/orderController");

router.get("/", verifyToken, getOrders);

router.post("/:gigId", verifyToken, createOrder);

module.exports = router;
