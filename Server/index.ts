import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import Auth from "./routes/auth.router";
import profileRoutes from "./routes/profile.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

//CONNECT DATABASE
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("✅ MongoDB is connected to:", process.env.MONGODB_URL);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    console.log(
      "Please make sure MongoDB is running or check your MONGODB_URL"
    );
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// Routers
app.use("/auth", Auth);
app.use("/", profileRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
