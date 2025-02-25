import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AdminPrivateRoute = ({ children }) => {
  const { user, allUserData } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { role } = allUserData || {};
  if (role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  if (token || user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminPrivateRoute;
