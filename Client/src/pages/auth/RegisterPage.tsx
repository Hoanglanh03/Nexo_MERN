import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/snackbarSlice";
import { registerUser } from "../../api/auth";
import { RegisterCredentials } from "@/types";

import Google from "../../assets/images/Google.png";
import Facebook from "../../assets/images/Facebook.png";
import Twitter from "../../assets/images/Twitter.png";

interface FormErrors {
  email?: string;
  fullName?: string;
  password?: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: "",
    fullName: "",
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

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter fullName";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        dispatch(
          openSnackbar({
            message: response.data.message,
            type: "success",
          }),
        );
        navigate("/login");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      dispatch(
        openSnackbar({
          message: err.response?.data?.message || "Registration failed",
          type: "error",
        }),
      );
    }
  };

  return (
    <>
      <div className="mb-7">
        <h4 className="text-2xl font-medium text-[#4B465C]">
          Adventure start here 🚀
        </h4>
        <p className="text-[15px] font-normal text-[#4B465C]">
          Make your app management easy and fun!
        </p>
      </div>
      <form className="mt-4 text-left" onSubmit={handleOnSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-label-100">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>
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
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-label-100">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="********"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <Button type="submit" variant="contained" className="w-full">
          Sign up
        </Button>
      </form>

      <p className="mt-4 text-center text-[15px] font-normal text-[#4B465C]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#246AA3]">
          Sign in instead
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
    </>
  );
};

export default RegisterPage;
