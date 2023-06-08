import { Navigate } from "react-router-dom";

export  const ProtectedRoute = ({ isLoggedIn, children }) => (
  !isLoggedIn ? <Navigate to="/sign-in" replace /> : children
);