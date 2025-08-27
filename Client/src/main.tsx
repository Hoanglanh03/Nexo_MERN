import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";

import theme from "./configs/muiConfig";
import store from "@redux/store";

import RootLayout from "@pages/RootLayout";
import PrivateRoute from "@components/PrivateRoute";

import AuthLayout from "@pages/auth/AuthLayout";
import RegisterPage from "@pages/auth/RegisterPage";

import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";

import ForgotPassword from "@pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";

import HomePage from "@pages/HomePage";
import "./index.css";
import Dialog from "./components/Dialog/Dialog";
import AccountSettingPage from "./pages/AccountSettingPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/forgotpassword",
            element: <ForgotPassword />,
          },
          {
            path: "/otp",
            element: <OTPVerifyPage />,
          },
          {
            path: "/verifyemail",
            element: <VerifyEmail />,
          },
          {
            path: "/resetpassword",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/account-setting",
        element: (
          <PrivateRoute>
            <AccountSettingPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <Dialog />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
