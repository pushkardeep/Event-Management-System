const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  location: {
    type: String,
  },
  role: {
    type: String,
    enum: ["real", "guest"],
    default: "real",
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
    },
  ],
  attending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
    },
  ],
});

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;
