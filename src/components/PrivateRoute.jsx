import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;