import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/snackbarSlice";
import { login } from "@redux/authSlice";
import { loginUser } from "../../api/auth";
import { LoginCredentials } from "@/types";

import Google from "../../assets/images/Google.png";
import Facebook from "../../assets/images/Facebook.png";
import Twitter from "../../assets/images/Twitter.png";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors: FormErrors = {};

    if (!formData.email.trim() && !formData.password.trim()) {
      newErrors.general = "*Please enter complete information";
    } else {
      if (!formData.email.trim()) {
        newErrors.email = "Please enter email";
      } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
        newErrors.email = "*Email must be a valid Gmail";
      }

      if (!formData.password.trim()) {
        newErrors.password = "*Please enter password";
      } else if (formData.password.length < 6) {
        newErrors.password = "*Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await loginUser(formData);
      console.log(response);
      if (response.status === 200) {
        dispatch(
          openSnackbar({
            message: response.data.message,
            type: "success",
          }),
        );

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        dispatch(login(response.data));

        navigate("/homepage");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      dispatch(
        openSnackbar({
          message: err.response?.data?.message || "Login failed",
          type: "error",
        }),
      );
    }
  };

  return (
    <div>
      <div className="mb-7">
        <h4 className="flex text-2xl font-medium text-[#4B465C]">
          Welcome to{" "}
          <span className="ml-1 font-bold text-[#246AA3]">Nexo !</span> 👋
        </h4>
        <p className="text-[15px] font-normal text-[#4B465C]">
          Please sign in to your account and start the adventure
        </p>
      </div>
      <form className="mt-4 text-left" onSubmit={handleOnSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-label-100">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john.doe@gmail.com"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between">
            <label className="mb-1 block text-sm font-semibold text-label-100">
              Password
            </label>
            <Link
              to="/forgotpassword"
              className="text-sm text-[#246AA3]"
              tabIndex={-1}
            >
              Forgot Password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="********"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {errors.general && (
          <p className="mb-3 text-sm text-red-500">{errors.general}</p>
        )}
        <Button type="submit" variant="contained" className="w-full">
          Login
        </Button>
      </form>

      <p className="mt-4 text-center text-[15px] font-normal text-[#4B465C]">
        New on our platform?{" "}
        <Link to="/register" className="text-[#246AA3]">
          Create an account
        </Link>
      </p>

      <div className="after:border-border relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 bg-white px-4">
          Or
        </span>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <img src={Facebook} alt="Facebook" className="social-icon h-8 w-8" />
        <img src={Twitter} alt="Twitter" className="social-icon h-8 w-8" />
        <img src={Google} alt="Google" className="social-icon h-8 w-8" />
      </div>
    </div>
  );
};

export default LoginPage;
