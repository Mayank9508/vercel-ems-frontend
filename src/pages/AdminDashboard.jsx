import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import AdminSidebar from "../components/adminDashboard/AdminSidebar";
import Navbar from "../components/adminDashboard/Navbar";
// import AdminView from "../components/dashboard/AdminView";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex font-['Changa_One']">
      <AdminSidebar />
      <div className="flex-1 ml-70 bg-gray-300 min-h-screen ">
        <div className="fixed w-full">
           <Navbar />
        </div>
        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
