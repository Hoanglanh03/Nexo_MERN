import { createSlice } from "@reduxjs/toolkit";

interface SettingSlice {
  isshowDrawer: boolean;
}

const initialState: SettingSlice = {
  isshowDrawer: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isshowDrawer = !state.isshowDrawer;
    },
  },
});

// Actions
export const { toggleDrawer } = settingSlice.actions;

// Reducer
export const settingReducer = settingSlice.reducer;
