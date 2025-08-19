import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthResponse } from "@/types";

const initialState: AuthState = {
  user: {},
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: () => {
      return initialState;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    saveUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Actions
export const { login, logout, setLoading, setError, saveUserInfo } =
  authSlice.actions;

// Reducer
export const authReducer = authSlice.reducer;
