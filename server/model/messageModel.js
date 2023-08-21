const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const Message = mongoose.model("Messages", messageSchema);
module.exports = Message;
