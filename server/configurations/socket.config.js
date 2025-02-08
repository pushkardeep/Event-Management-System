const { Server } = require("socket.io");
const socketHandlers = require("../sockets/socketHandlers");
const socketAuth = require("../middlewares/socketAuth");

module.exports = (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URI, // React Client URL
      },
    });

    // middle ware
    io.use(socketAuth);

    io.on("connection", (socket) => {
      console.log("a user connected", socket.id);
      // handle all events
      socketHandlers(io, socket);
    });

    io.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  } catch (error) {
    console.log("error in socket ", error.message);
  }
};
