const userModal = require("../modals/user.modal");
const { update } = require("../services/event.service");

module.exports = (io, socket) => {
  socket.on("attendeeChanged", async (data) => {
    try {
      const user = await userModal.findOne({ _id: socket?.user?._id });

      if (!user) {
        return socket.emit("enrollmentResponse", {
          success: false,
          message: "User not found",
        });
      }

      if (user?.role === "guest") {
        return socket.emit("enrollmentResponse", {
          success: false,
          message: "Guest can't enroll",
        });
      }

      const { success, attendees, message } = await update(
        data.data.id,
        socket.user._id
      );

      if (!success) {
        return socket.emit("enrollmentResponse", { success, message }); // Sends response only to the sender
      }

      // Broadcast updated attendees count to all clients
      io.emit("enrollmentResponse", {
        success: true,
        eventId: data.data.id,
        attendees,
        message,
      });
    } catch (error) {
      socket.emit("enrollmentResponse", {
        success: false,
        message: "An error occurred",
      });
    }
  });
};
