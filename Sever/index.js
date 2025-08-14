const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;


//CONNECT DATABASE
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

//Call function to connect to database
connectDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.listen(port, () => {
  console.log("đã kết nối ĐB");
});
