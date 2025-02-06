const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Success connecting database");
    })
    .catch((err) => {
      console.log("mongoose Err", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
