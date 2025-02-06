const express = require("express");
const router = express.Router();

const {
  createEvent,
  deleteEvent,
  readEventS,
  updateStatus
} = require("../controllers/event/event.controller");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/get_events", isLoggedIn, readEventS);
router.post("/create", isLoggedIn, createEvent);
router.patch("/update/:eventId", isLoggedIn, updateStatus);
router.delete("/delete/:eventId", isLoggedIn, deleteEvent);

module.exports = router;
