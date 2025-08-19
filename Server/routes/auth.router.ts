import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/auth.controllers";

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/forgot-password
router.post("/send-otp", sendOtp);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtp);

// POST /api/auth/verify-otp
router.post("/reset-password", resetPassword);

// POST /api/auth/refresh
router.post("/refresh", refreshAccessToken);

export default router;
