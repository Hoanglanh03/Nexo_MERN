import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./layout/Header";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // const token = useAppSelector((state) => state.auth.accessToken);

  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header />
      <div className="bg-dark-200">{children}</div>
    </div>
  );
};

export default PrivateRoute;
