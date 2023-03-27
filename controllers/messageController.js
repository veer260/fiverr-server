const Message = require("../models/message");
const Conversation = require("../models/conversation");
const createMessage = async (req, res, next) => {
  console.log(typeof req.body.id);
  try {
    const newMessage = await Message.create({
      conversationId: req.body.id,
      userId: req.id,
      desc: req.body.desc,
    });
    await Conversation.findOneAndUpdate(
      {
        id: req.body.id,
      },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      {
        new: true,
      }
    );
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
};
