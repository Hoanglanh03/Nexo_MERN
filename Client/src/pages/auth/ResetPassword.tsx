import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "@/api/auth";

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const email = location.state?.email || "";

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

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

    if (!formData.newPassword.trim() || !formData.confirmPassword.trim()) {
      newErrors.general = "*Please enter all fields";
    } else {
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = "*Password must be at least 6 characters";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "*Passwords do not match";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await resetPassword({
        email,
        newPassword: formData.newPassword,
      });

      setSuccessMsg(res.message || "Reset password successfully ✅");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setErrors({
        general: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-7">
        <h4 className="flex text-2xl font-medium text-[#4B465C]">
          Reset Your Password 🔒
        </h4>
        <p className="text-[15px] font-normal text-[#4B465C]">
          Enter your new password below
        </p>
      </div>

      <form className="mt-4 text-left" onSubmit={handleOnSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-label-100">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-label-100">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm new password"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {errors.general && (
          <p className="mb-3 text-sm text-red-500">{errors.general}</p>
        )}
        {successMsg && (
          <p className="mb-3 text-sm text-green-500">{successMsg}</p>
        )}

        <Button
          type="submit"
          variant="contained"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </Button>
      </form>

      <p className="mt-4 text-center text-[15px] font-normal text-[#4B465C]">
        Remember your password?{" "}
        <Link to="/login" className="text-[#246AA3]">
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
