const userModal = require("../modals/user.modal");
const jwt = require("jsonwebtoken");

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || null;

    if (!token) {
      return console.log("No token found");
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log("Token not valid");
      }

      const user = await userModal.findOne({ _id: data.id });

      if (!user) {
        console.log("User not found");
      }

      socket.user = user;
      next();
    });
  } catch (error) {
    console.log("socket auth error ", error.message);
  }
};

module.exports = socketAuth;
