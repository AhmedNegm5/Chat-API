const Chat = require("../models/chatModel");

const createChat = async (req, res, next) => {
  try {
    const { firstId, secondId } = req.body;
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      res.status(200).json({ chat });
    } else {
      const newChat = new Chat({
        members: [firstId, secondId],
      });

      const savedChat = await newChat.save();
      res.status(201).json({ chat: savedChat });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const userChats = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.find({
      members: { $in: [userId] },
    });

    res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findChat = async (req, res, next) => {
  try {
    const { firstId, secondId } = req.params;

    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, userChats, findChat };
