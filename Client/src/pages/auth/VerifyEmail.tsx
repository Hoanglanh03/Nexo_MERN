import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  console.log("email:", email);
  return (
    <div>
      <div className="mb-7">
        <h4 className="text-start text-2xl font-medium text-[#4B465C]">
          TVerify your email ✉️
        </h4>
        <p className="text-[14px] font-normal text-[#4B465C]">
          Account activation link sent to your email address: {email}
          Please follow the link inside to continue.
        </p>
      </div>

      <Button type="submit" variant="contained" className="w-full">
        <Link to="/otp" state={{ email }}>
          {" "}
          Skip for now
        </Link>
      </Button>

      <p className="mt-4 text-center text-[15px] font-normal text-[#4B465C]">
        Didn't get the mail?
        <Link to="/login" className="text-[#246AA3]">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
