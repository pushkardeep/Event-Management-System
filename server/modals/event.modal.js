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
    enum: ["music", "sport", "art", "other"],
    required: true,
  },
  status: {
    type: String,
    enum: ["wait", "live", "cancled"],
    default: "wait",
    required: true,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const eventModal = mongoose.model("Event", eventSchema);
module.exports = eventModal;
