const express = require("express");
const router = express.Router();

const {
  register,
  sign_in,
  guest_log_in,
} = require("../controllers/user/auth.controller");

router.post("/register", register);
router.post("/sign_in", sign_in);
router.post("/guest_log_in", guest_log_in);

module.exports = router;
