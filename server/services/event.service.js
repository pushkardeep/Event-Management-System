const eventModal = require("../modals/event.modal");

const create = async (
  cover,
  title,
  description,
  category,
  location,
  date,
  time,
  status,
  userId
) => {
  try {
    const event = await eventModal.create({
      cover,
      title,
      description,
      category,
      location,
      date,
      time,
      status,
      owner: userId,
    });

    if (!event) {
      return {
        success: false,
        message: "Event creation error.",
      };
    }

    return {
      success: true,
      event,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
};

const remove = async (eventId) => {
  try {
    await eventModal.findByIdAndDelete(eventId);
    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in deleting event",
    };
  }
};

const update = async (eventId, status) => {
  try {
  const event = await eventModal.findByIdAndUpdate(
      eventId,
      { $set: { status } },
      { new: true }
    );

    return {
      success: true,
      event,
      message: "Event updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
};

module.exports = { create, remove, update };
