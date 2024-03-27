import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ path, element, requiredRoles }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  const isAuthorized = () => {
    if (!isAuthenticated) return false;
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.includes(userRole);
  };

  return isAuthorized() ? (
    <Route path={path} element={element} />
  ) : (
    
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
