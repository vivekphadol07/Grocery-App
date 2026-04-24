import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const PrivateRoute = () => {
  const { isLoggedIn, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
