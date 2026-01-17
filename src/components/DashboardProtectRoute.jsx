import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const DashboardProtectRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const { authChecked } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  //agar user /dashboard open kare
  if (location.pathname === "/dashboard") {
    if (user.role === "admin") {
      return <Navigate to="/dashboard/admin" replace />;
    }

    if (user.role === "employee") {
      return <Navigate to="/dashboard/employee" replace />;
    }
  }

  return <Outlet />;
};

export default DashboardProtectRoute;
