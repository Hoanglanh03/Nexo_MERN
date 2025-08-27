import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { snackbarReducer } from "./slices/snackbarSlice";
import { settingReducer } from "./slices/settingSlice";
import { dialogReducer } from "./slices/dialogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    setting: settingReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
