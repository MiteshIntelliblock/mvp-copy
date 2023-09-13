import { Navigate } from "react-router-dom";

export default function Protected({ Component, isAuthenticated }) {
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
}
