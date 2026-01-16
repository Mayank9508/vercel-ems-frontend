import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/adminDashboard/Navbar";
import EmployeeSidebar from "../components/employeeDashboard/EmployeeSidebar";


const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.role !== "employee") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex font-['Changa_One']">
      <EmployeeSidebar />
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

export default EmployeeDashboard;
