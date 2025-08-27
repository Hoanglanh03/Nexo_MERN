import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import Auth from "./routes/auth.router";
import postRoutes from "./routes/post.router";
import likeRoutes from "./routes/like.router";
import User from "./routes/user.router";

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
app.use("/users", User);

//Post

app.use(express.json());
app.use("/posts", postRoutes);
app.use("/posts", likeRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
