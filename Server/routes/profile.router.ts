import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getProfile } from "../controllers/user.controllers";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

export default router;
