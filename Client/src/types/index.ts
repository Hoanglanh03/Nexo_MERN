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

export interface ForgotPasswordRequest {
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

// API Response types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
}

// Redux types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
