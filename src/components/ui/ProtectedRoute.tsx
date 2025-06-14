import { Navigate } from "react-router-dom";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute