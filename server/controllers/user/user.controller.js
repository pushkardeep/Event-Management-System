const userModal = require("../../modals/user.modal");

const profile = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const userEvents = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    const findUser = await userModal
      .findOne({ _id: user._id })
      .populate("events");

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({ success: true, userEvents: findUser.events });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { profile, userEvents };
