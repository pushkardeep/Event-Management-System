const bcrypt = require("bcrypt");
const userModal = require("../../modals/user.modal");

const { create } = require("../../services/user.service");
const generateToken = require("../../utils/generateToken.utils");

const register = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    if (!name || !email || !location || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Encryption error",
      });
    }

    const { user, success, message } = await create(
      name,
      email,
      location,
      hashedPassword
    );

    if (!success) {
      return res.status(400).json({ success: false, message });
    }

    const result = generateToken({ id: user._id });
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, user, token: result.token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const sign_in = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await userModal.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      if (!result) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      const token = generateToken({ id: user._id });
      if (!token.success) {
        return res.status(400).json({
          success: false,
          message: token.message || "Token generation error",
        });
      }

      return res.status(200).json({ success: true, user, token: token.token });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const guest_log_in = async (req, res) => {
  try {
    const name = "Guest" + Date.now() + Math.floor(Math.random() * 1000);
    const { user, success, message } = await create(
      name,
      null,
      null,
      null,
      "guest"
    );

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: message || "Guest creation error" });
    }

    const result = generateToken({ id: user._id }, "24h"); // expires in 24 hours

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: token.message || "Token generation error",
      });
    }

    res.json({ success: true, user, token: result.token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { register, sign_in, guest_log_in };
