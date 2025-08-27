import { createSlice } from "@reduxjs/toolkit";

interface DialogSlice {
  open: boolean;
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth: boolean;
  title: string | null;
  contentType: string | null;
  additionalData: {};
  actions: string | null;
}

const initialState: DialogSlice = {
  open: false,
  maxWidth: "sm",
  fullWidth: true,
  title: null,
  contentType: null,
  additionalData: {},
  actions: null,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      return { ...state, ...action.payload, open: true };
    },
    closeDialog: () => {
      return initialState;
    },
  },
});

// Actions
export const { openDialog, closeDialog } = dialogSlice.actions;

// Reducer
export const dialogReducer = dialogSlice.reducer;
