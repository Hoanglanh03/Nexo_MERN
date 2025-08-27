import { toggleLike } from "../controllers/like.controllers";
import auth from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.post("/:id/like", auth, toggleLike);
export default router;
