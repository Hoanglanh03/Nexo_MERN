import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import HomePage from "@pages/HomePage";
import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import "./index.css";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import store from "@redux/store";
import RootLayout from "@pages/RootLayout";
import PrivateRoute from "@components/PrivateRoute";
import ForgotPassword from "@pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";

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
        path: "/homepage",
        element: (
          <PrivateRoute>
            <HomePage />
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
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
