import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewCard from "../ViewCard";
import {
  FaBuilding,
  FaFileAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";

const AdminView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axiosInstance.get(
        "/dashboard",
        { withCredentials: true }
      );
      setData(res.data.data);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 ">
      <h3 className="text-3xl mb-6">Dashboard Overview</h3>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ViewCard
          icon={<FaUsers />}
          text="Total Employees"
          num={data.totalEmployees}
          color="bg-gradient-to-r from-teal-500 to-teal-700"
        />
        <ViewCard
          icon={<FaBuilding />}
          text="Total Departments"
          num={data.totalDepartments}
          color="bg-gradient-to-r from-yellow-500 to-yellow-700"
        />
        <ViewCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          num={`₹ ${data.monthlySalary}`}
          color="bg-gradient-to-r from-green-500 to-green-700"
        />
      </div>

      {/* LEAVE SECTION */}
      <div className="mt-10">
        <h4 className="text-2xl text-center mb-4">Leave Overview</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ViewCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            num={data.leave.applied}
            color="bg-gradient-to-r from-blue-500 to-blue-700"
          />
          <ViewCard
            icon={<FaBuilding />}
            text="Leave Approved"
            num={data.leave.approved}
            color="bg-gradient-to-r from-green-500 to-green-700"
          />
          <ViewCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            num={data.leave.rejected}
            color="bg-gradient-to-r from-red-500 to-red-700"
          />
          <ViewCard
            icon={<FaMoneyBillWave />}
            text="Leave Pending"
            num={data.leave.pending}
            color="bg-gradient-to-r from-yellow-500 to-yellow-700"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminView;
