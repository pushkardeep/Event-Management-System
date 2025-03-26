const express = require("express");
const app = express();

// creating server
const http = require("http");
const server = http.createServer(app);

// socket.io
require("./configurations/socket.config")(server);

const cors = require("cors");

const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/event.route");

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/event", eventRouter);

app.get("/",(req, res)=>{
res.send("i am alive how are you");
})

module.exports = server;
