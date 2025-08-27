import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@/redux/slices/snackbarSlice";
import { sendOtp } from "@/api/auth";

interface FormErrors {
  email?: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "*Please enter email";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = "*Email must be a valid Gmail";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await sendOtp({ email });
      console.log(response.data);
      if (response.status === 200) {
        if (email) {
          dispatch(
            openSnackbar({
              message: "Password reset link sent to your email",
              type: "success",
            }),
            console.log("gmail :", response.data.user.email),
          );
          navigate("/verifyemail", { state: { email } });
        }
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);

      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 404) {
        newErrors.email = "*Email không tồn tại";
      } else if (data?.error || data?.message) {
        newErrors.email = `*${data.message || data.error}`;
      } else {
        newErrors.email = "*error";
      }

      setErrors({ ...newErrors });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <div>
      <div className="mb-7">
        <h4 className="flex text-2xl font-medium text-[#4B465C]">
          Forgot Password? 🔒
        </h4>
        <p className="text-[15px] font-normal text-[#4B465C]">
          Enter your email, and we'll send you instructions to reset your
          password
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
            value={email}
            onChange={handleInputChange}
            placeholder="john.doe@gmail.com"
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}

        <Button type="submit" variant="contained" className="w-full">
          Send Reset Link
        </Button>
      </form>
      <p className="mt-3 text-center">
        <Link to="/login" className="text-[#246AA3]">
          {"<"} Back to log in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
