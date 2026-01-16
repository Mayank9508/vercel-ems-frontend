import React from "react";
import { NavLink } from "react-router";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const EmployeeSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user from redux->", user);

  return (
    <div className="bg-linear-to-b from-slate-800 to-slate-900 text-gray-200 h-screen fixed left-0 top-0 bottom-0 w-70">
      {/* Logo */}
      <div className="flex items-center justify-center h-12 text-white text-2xl  tracking-wide bg-teal-600 shadow-md">
        OfficeSetu
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 px-3 mt-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaTachometerAlt />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to={`/dashboard/employee/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaUser />
          <span className="font-medium">My Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/employee/leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaCalendar />
          <span className="font-medium">Leaves</span>
        </NavLink>

        <NavLink
          to={`/dashboard/employee/salary`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaMoneyBillWave />
          <span className="font-medium">Salary</span>
        </NavLink>

        <NavLink
          to="/dashboard/employee/setting"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaCogs />
          <span className="font-medium">Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
