import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const AdminRoute = () => {
  const { isAdmin, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Authenticating...
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
