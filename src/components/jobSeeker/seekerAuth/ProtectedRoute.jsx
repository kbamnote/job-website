import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("JwtToken");
  const id = Cookies.get("userID");

  if (!token || !id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;