const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["music", "sports", "art", "other"],
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const eventModal = mongoose.model("Event", eventSchema);
module.exports = eventModal;
