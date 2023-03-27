const Conversation = require("../models/conversation");
const createConversation = async (req, res, next) => {
  try {
    const newConvo = await Conversation.create({
      id: req.isSeller ? req.id + req.body.to : req.body.to + req.id,
      sellerId: req.isSeller ? req.id : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.id,
      readByBuyer: !req.isSeller,
      readBySeller: req.isSeller,
    });
    res.status(201).json(newConvo);
  } catch (error) {
    next(error);
  }
};

const getConversations = async (req, res, next) => {
  try {
    const convos = await Conversation.find(
      req.isSeller ? { sellerId: req.id } : { buyerId: req.id }
    ).sort({ updatedAt: -1 });
    res.status(200).json(convos);
  } catch (error) {
    next(error);
  }
};
const getSingleConversation = async (req, res, next) => {
  try {
    const convo = await Conversation.findOne({ id: req.params.id });
    res.status(200).json(convo);
  } catch (error) {
    next(error);
  }
};
const updateConversation = async (req, res, next) => {
  try {
    console.log("inside update");
    const updatedConvo = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readByBuyer: true,
          readBySeller: true,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedConvo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getSingleConversation,
  updateConversation,
  createConversation,
};
