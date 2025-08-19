import api from "./api";
import {
  LoginCredentials,
  RegisterCredentials,
  sendOtpRequest,
  verifyOptRequest,
  resetPasswordRequest,
} from "@/types";

export const loginUser = (data: LoginCredentials) =>
  api.post("/auth/login", data);

export const registerUser = (data: RegisterCredentials) =>
  api.post("/auth/register", data);

export const sendOtp = (data: sendOtpRequest) =>
  api.post("/auth/send-otp", data);

export const verifyOtp = (data: verifyOptRequest) =>
  api.post("/auth/verify-otp", data);

export const resetPassword = (data: resetPasswordRequest) =>
  api.post("/auth/reset-password", data);
