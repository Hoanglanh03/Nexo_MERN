import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthResponse } from "@/types";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: {},
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.message = action.payload.message || "";
    },
    logout: () => {
      return initialState;
    },
    saveUserInfo: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

// Actions
export const { login, logout, saveUserInfo } = authSlice.actions;

// Reducer
export const authReducer = authSlice.reducer;
export type { AuthState };
