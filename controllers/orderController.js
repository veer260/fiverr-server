const Gig = require("../models/gig");
const Orders = require("../models/orders");

const createOrder = async (req, res, next) => {
  const gig = await Gig.findById(req.params.gigId);
  console.log("gig:", gig);
  try {
    const newOrder = await Orders.create({
      title: gig.title,
      sellerId: gig.userId,
      buyerId: req.id,
      img: gig.cover,
      price: gig.price,
      gigId: gig._id,
      payment_intent: "temporary",
    });

    res.status(201).send("successfull");
  } catch (error) {
    next(error);
  }
};
const getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({
      ...(req.isSeller ? { sellerId: req.id } : { buyerId: req.id }),
      isCompleted: true,
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  createOrder,
};
