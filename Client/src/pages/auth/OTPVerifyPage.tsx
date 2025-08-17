import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAppDispatch } from "@redux/hooks";
import { verifyOtp } from "@/api/auth";
import { openSnackbar } from "@redux/snackbarSlice";

const OTPVerifyPage: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleOnSubmitVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const response = await verifyOtp({ otp, email });
      if (response.status === 200) {
        dispatch(
          openSnackbar({
            message: "OTP verification successful ✅",
            type: "success",
          }),
        );
        navigate("/resetpassword", { state: { email, otp } });
        console.log("✅ Verify success:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-7">
        <h4 className="text-start text-2xl font-medium text-[#4B465C]">
          Two-Step Verification 💬
        </h4>
        <p className="text-[14px] font-normal text-[#4B465C]">
          We sent a verification code to your mobile. Enter the code from the
          mobile in the field below.
        </p>
        <span className="text-[14px] font-bold text-[#246AA3]">{email}</span>
      </div>
      <form className="mt-4 text-left" onSubmit={handleOnSubmitVerifyOtp}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-label-100">
            Type your 6 digit security code
          </label>

          <MuiOtpInput value={otp} onChange={handleOtpChange} length={6} />
        </div>
        <Button type="submit" variant="contained" className="w-full">
          Verify my account
        </Button>
      </form>

      <p className="mt-4 text-center text-[15px] font-normal text-[#4B465C]">
        Didn't get the code?{" "}
        <Link to="/login" className="text-[#246AA3]">
          Resend
        </Link>
      </p>
    </>
  );
};

export default OTPVerifyPage;
