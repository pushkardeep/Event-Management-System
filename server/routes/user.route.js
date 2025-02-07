const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const {
  register,
  sign_in,
  guest_log_in,
} = require("../controllers/user/auth.controller");

const { profile } = require("../controllers/user/user.controller");

router.post("/register", register);
router.post("/sign_in", sign_in);
router.post("/guest_log_in", guest_log_in);
router.get("/profile", isLoggedIn, profile);

module.exports = router;
