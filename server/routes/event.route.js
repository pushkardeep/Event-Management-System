const express = require("express");
const router = express.Router();

const {
  createEvent,
  deleteEvent,
  readEventS,
} = require("../controllers/event/event.controller");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/get_events", isLoggedIn, readEventS);
router.post("/create", isLoggedIn, createEvent);
router.delete("/delete/:eventId", isLoggedIn, deleteEvent);

module.exports = router;
