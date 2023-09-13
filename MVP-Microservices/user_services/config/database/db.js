const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("db connected");
  } catch (err) {
    console.log(err, "error inside mongodbbb");
    process.exit(1);
  }
};

// mongoose.connection.on("connected", () => {
//   console.log("Mongoose connected to db");
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err.message);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("Mongoose connection is disconnected.");
// });

// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   process.exit(0);
// });

module.exports = connectDB;
