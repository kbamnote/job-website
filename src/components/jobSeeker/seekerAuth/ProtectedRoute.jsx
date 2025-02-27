import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("JwtToken");
  const id = Cookies.get("userID");
  const hostToken = Cookies.get("token");
  const hostId = Cookies.get("user");

  if ((hostToken && hostId) || (token && id)) {
    return children;
  } else {
   
    return <Navigate to="/login" replace />;
  }
};


export default ProtectedRoute;