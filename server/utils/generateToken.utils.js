const jwt = require("jsonwebtoken");

const generateToken = (data, expiresIn) => {
  try {
    const tokenOptions = expiresIn ? { expiresIn } : {};
    const token = jwt.sign(data, process.env.JWT_SECRET, tokenOptions);

    if (!token) {
      return { success: false, message: "Token generation error" };
    }
    return { success: true, token };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Token generation error",
    };
  }
};

module.exports = generateToken;
