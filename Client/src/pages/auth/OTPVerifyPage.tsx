import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAppDispatch } from "@redux/hooks";
import { sendOtp, verifyOtp } from "@/api/auth";
import { openSnackbar } from "@/redux/slices/snackbarSlice";

const OTPVerifyPage: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    try {
      const response = await sendOtp({ email });
      if (response.status === 200) {
        console.log(response.data);
      }
      setTimer(30);
      setCanResend(false);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Forgot password error:", error);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (errorMessage) setErrorMessage(null);
  };

  const handleOnSubmitVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setErrorMessage(null);
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
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data.message;
      if (status === 400) {
        console.log(data);
        setErrorMessage(data);
      }
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
          {errorMessage && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
        {canResend ? (
          <Button onClick={handleResend} variant="contained" className="w-full">
            Resend OTP
          </Button>
        ) : (
          <Button type="submit" variant="contained" className="w-full">
            <Link to="/otp" state={{ email }}>
              Verify my account
            </Link>
          </Button>
        )}
        {!canResend && (
          <p className="mt-2 text-center text-[15px] font-bold text-[#4B465C]">
            resend OTP in <span className="text-[#246AA3]">{timer}s</span>
          </p>
        )}
      </form>

      <p className="mt-4 text-center text-[15px] font-normal text-[#4B465C]">
        Didn't get the code?
        <Link to="/verifyemail" className="text-[#246AA3]">
          back
        </Link>
      </p>
    </>
  );
};

export default OTPVerifyPage;
