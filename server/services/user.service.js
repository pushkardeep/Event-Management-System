const userModal = require("../modals/user.modal");

const create = async (name, email, location, password, role) => {
  try {
    const fileds = {};
    name && (fileds.name = name);
    email && (fileds.email = email);
    location && (fileds.location = location);
    password && (fileds.password = password);
    role && (fileds.role = role);

    const user = await userModal.create(fileds);
    if (!user) {
      return { success: false, message: "User creation error." };
    }
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message || "User creation error." };
  }
};

const addEvents = async (userId, eventId) => {
  try {
    await userModal.findByIdAndUpdate(
      userId,
      { $push: { events: eventId } },
      { new: true }
    );

    return {
      success: true,
      message: "Event created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error in creating event",
    };
  }
};

const removeEvent = async (userId, eventId) => {
  try {
    await userModal.findByIdAndUpdate(
      userId,
      { $pull: { events: eventId } },
      { new: true }
    );

    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error in deleting event",
    };
  }
};

module.exports = { create, addEvents, removeEvent };
