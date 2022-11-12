import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user } = useContext(UserContext);
  if (!user?.email) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export { ProtectedRoute };
