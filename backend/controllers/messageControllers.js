const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
    try {
        let messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat");
        //   messages = await Chat.populate(messages,
        //     {
        //         path: "chat.users",
        //         // select: "name pic email",
        //       }

        //   )
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
});


const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;
  if (!chatId || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  allMessages,
  sendMessage,
};

