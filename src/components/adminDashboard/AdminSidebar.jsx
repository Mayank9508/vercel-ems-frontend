import React from "react";
import { NavLink } from "react-router";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaFileAlt,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
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
          to="/dashboard/admin/employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaUsers />
          <span className="font-medium">Employees</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/departments"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaBuilding />
          <span className="font-medium">Department</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/leaves"
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
          <span className="font-medium">Leave</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin/salary/add"
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
          to="/dashboard/admin/setting"
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

        <NavLink
          to="/dashboard/admin/attendence"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaUserCheck />
          <span className="font-medium">Attendence</span>
        </NavLink>


        <NavLink
          to="/dashboard/admin/attendence-report"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-5 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-teal-600 text-white shadow"
                : "hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <FaFileAlt />
          <span className="font-medium">Attendence Report</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
