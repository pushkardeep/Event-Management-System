const eventModal = require("../modals/event.modal");
const userModal = require("../modals/user.modal");

const create = async (
  cover,
  title,
  description,
  category,
  location,
  date,
  time,
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

const update = async (eventId, userId) => {
  try {
    const event = await eventModal.findById(eventId);
    const user = await userModal.findOne({ _id: userId });

    if (!event || !user) {
      return {
        success: false,
        message: "Event or User not found",
      };
    }

    const isUserAttending = event.attendees.includes(userId);
    const isEventInUser = user.attending.includes(eventId);

    // Update event attendees list
    const updatedEvent = await eventModal.findByIdAndUpdate(
      eventId,
      {
        [isUserAttending ? "$pull" : "$push"]: { attendees: userId },
      },
      { new: true }
    );

    // Update user's attending events list
    const updatedUser = await userModal.findByIdAndUpdate(
      userId,
      {
        [isEventInUser ? "$pull" : "$push"]: { attendingEvents: eventId },
      },
      { new: true }
    );

    if (!updatedEvent || !updatedUser) {
      return {
        success: false,
        message: "An error occurred while updating enrollment",
      };
    }

    return {
      success: true,
      attendees: updatedEvent?.attendees?.length,
      message: isUserAttending
        ? "User canceled enrollment"
        : "User enrollment successful",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal server error",
    };
  }
};

module.exports = { create, remove, update };
