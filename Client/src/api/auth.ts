import api from "./api";
import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordRequest,
  User,
  verifyOptRequest,
  resetPasswordRequest,
} from "@/types";

export const loginUser = (data: LoginCredentials) =>
  api.post("/auth/login", data);

export const registerUser = (data: RegisterCredentials) =>
  api.post("/auth/register", data);

export const forgotPassword = (data: ForgotPasswordRequest) =>
  api.post("/auth/forgot-password", data);

export const verifyOtp = (data: verifyOptRequest) =>
  api.post("/auth/verify-otp", data);

export const resetPassword = (data: resetPasswordRequest) =>
  api.post("/auth/reset-password", data);

export const getProfile = () => api.get<User>("/profile");

// export const getProfile = async () => {
//   try {
//     const res = await api.get("/profile");
//     if (!res.data) {
//       throw new Error("No profile data in response");
//     }
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     throw error;
//   }
// };
