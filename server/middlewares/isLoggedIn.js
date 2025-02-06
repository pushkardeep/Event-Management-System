const jwt = require("jsonwebtoken");
const userModal = require("../modals/user.modal");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1] || null;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid token",
        });
      }

      const user = await userModal.findOne({ _id: data.id });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = isLoggedIn;
