import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string | null;
  type: "success" | "error" | "warning" | "info";
}

interface SnackbarPayload {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const initialState: SnackbarState = {
  open: false,
  message: null,
  type: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarPayload>) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.message = null;
      state.type = "success";
    },
  },
});

// Actions
export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

// Reducer
export const snackbarReducer = snackbarSlice.reducer;
