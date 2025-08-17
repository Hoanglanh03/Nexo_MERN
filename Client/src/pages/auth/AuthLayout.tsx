import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import logo_nexo from "../../assets/images/logo_nexo (2).png";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-dark-100">
      <div className="h-fit w-[450px] rounded-lg bg-white px-8 py-10">
        <img
          src={logo_nexo}
          alt="Nexo Logo"
          className="mx-auto mb-2 h-[80px] w-[80px]"
        />

        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
