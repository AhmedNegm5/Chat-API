const Message = require("../models/messageModel");

const createMessage = async (req, res, next) => {
  try {
    const { chatId, senderId, text } = req.body;

    const message = new Message({
      chatId,
      senderId,
      text,
    });

    const savedMessage = await message.save();

    res.status(201).json({ message: savedMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId });

    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage, getMessages };
