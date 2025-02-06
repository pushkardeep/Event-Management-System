const express = require("express");
const app = express();

const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/event.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/event", eventRouter);

module.exports = app;
