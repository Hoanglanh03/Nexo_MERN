import * as React from "react";

// User types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "User" | "Admin";
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  fullName: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface sendOtpRequest {
  email: string;
}

export interface verifyOptRequest {
  email: string;
  otp: string;
}

export interface resetPasswordRequest {
  email: string;

  newPassword: String;
}

export interface IPost {
  content: string;
  image: File | null | string;
}

export interface postCredentials {
  fullName: string;
  createdAt: string | Date;
  content: string;
  image: string;
  likes: ILike[];
  comments: string;
}

// API Response types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
}

// Redux types
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: Record<string, any>; // hoặc { id: string; email: string }
  message?: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validation?: any;
}

export interface ILike {
  user: { id: string; email: string; fullName: string };
  post: { id: string };
  createdAt: string;
}

// Component props types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

export interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // ✅
}
