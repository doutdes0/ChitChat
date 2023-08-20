const Message = require("../model/messageModel");

const getAllMessages = async (req, res, next) => {
  const { from, to } = req.query;
  try {
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const mapped_messages = messages.map((msg) => {
      return {
        msg: msg.message,
        isFromSelf: msg.from.toString() === from,
      };
    });
    const data = {
      [to]: mapped_messages,
    };
    console.log("in getAllMsgs contr", data);

    res.status(200).json({ data });
  } catch (e) {
    next(e);
  }
};

const addMessage = async (req, res, next) => {
  const { from, to, msg } = req.body;
  try {
    await Message.create({ message: msg, from, to, users: [from, to] });
    res.status(200).json({ msg: "Msg added" });
  } catch (e) {
    next(e);
  }
};

module.exports = { getAllMessages, addMessage };
