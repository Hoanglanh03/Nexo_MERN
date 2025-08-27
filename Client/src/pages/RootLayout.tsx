import React, { Suspense } from "react";
import { Alert, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { closeSnackbar } from "@/redux/slices/snackbarSlice";

const RootLayout: React.FC = () => {
  const { open, type, message } = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  return (
    <div className="text-dark-100">
      <Suspense fallback={<p>Loading</p>}>
        <Outlet />
      </Suspense>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          dispatch(closeSnackbar());
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RootLayout;
