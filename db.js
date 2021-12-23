const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config.env" });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    //console.log(process.env.MONGO_URI);
    console.log("Mongo is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
