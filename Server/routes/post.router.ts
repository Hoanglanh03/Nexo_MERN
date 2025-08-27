import {
  createPost,
  getPosts,
  getPostById,
  // updatePost,
  deletePost,
} from "../controllers/post.controllers";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/upload";

const router = Router();

// Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// Protected routes (require authentication)
router.post("/", authMiddleware, upload.single("image"), createPost);

// router.put("/:id", auth, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
