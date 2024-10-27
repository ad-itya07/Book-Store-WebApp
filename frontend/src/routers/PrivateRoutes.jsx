import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const PrivateRoutes = ({ children }) => {
  const { currentUser , isLoading } = useAuth();

  if (isLoading) return <div><Loading /></div>
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
