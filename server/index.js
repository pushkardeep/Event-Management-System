require("dotenv").config();

const connectDB = require("./configurations/mongodb.config");
const app = require("./server");

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3002;

    app.listen(port, () => {
      console.log(`post service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the user service:", error);
  }
};

startServer();
