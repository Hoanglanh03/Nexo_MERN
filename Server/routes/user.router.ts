import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getProfile, updateUser } from "../controllers/user.controllers";

const router = express.Router();

router.get("/:id", authMiddleware, getProfile);
router.put("/:id", authMiddleware, updateUser);

export default router;
