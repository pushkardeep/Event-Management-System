const eventModal = require("../../modals/event.modal");
const { create, remove, update } = require("../../services/event.service");

const { addEvents, removeEvent } = require("../../services/user.service");

const createEvent = async (req, res) => {
  try {
    const {
      cover,
      title,
      description,
      category,
      location,
      date,
      time,
    } = req.body;

    if (
      !cover ||
      !title ||
      !description ||
      !category ||
      !location ||
      !date ||
      !time
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user?.role === "guest") {
      return res.status(400).json({
        success: false,
        message: "Guests cannot create events",
      });
    }

    const { event, success, message } = await create(
      cover,
      title,
      description,
      category,
      location,
      date,
      time,
      user._id
    );

    if (!success) {
      return res.status(400).json({
        success: false,
        message: message || "Event creation error",
      });
    }

    const result = await addEvents(user._id, event._id);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Error in creating event",
      });
    }

    return res.status(200).json({
      success: true,
      event,
      message: "Event created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event not found",
      });
    }

    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user?.role === "guest") {
      return res.status(400).json({
        success: false,
        message: "Guests cannot create events",
      });
    }

    const event = await eventModal.findById(eventId);

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event not found",
      });
    }

    const { success, message } = await remove(eventId);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: message || "Error in deleting event",
      });
    }

    const result = await removeEvent(user._id, eventId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Error in deleting event",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const readEventS = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const events = await eventModal.find().populate("owner");

    if (!events) {
      return res.status(400).json({
        success: false,
        message: "Events not found",
      });
    }

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { createEvent, readEventS, deleteEvent };
