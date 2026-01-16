import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const LeaveList = () => {
  const { user } = useSelector((state) => state.auth);
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axiosInstance.get("/leave/my-leave-list");
      if (res.data.success) {
        setLeaves(res.data.leaves);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="text-center mb-6">
        <h3 className="text-2xl text-gray-800">My Leaves</h3>
      </div>

      {/* Top Actions */}
      <div className="flex justify-between  items-center mb-4">
        <input
          type="text"
          placeholder="Search Leave Type"
          className="px-4 py-1.5 border  border-gray-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <Link
          to="/dashboard/employee/add-leave"
          className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 rounded text-white text-sm"
        >
          Add New Leave
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded shadow-sm overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-center font-normal">SNO</th>
              <th className="px-4 py-3 text-center font-normal">Leave Type</th>
              <th className="px-4 py-3 text-center font-normal">From</th>
              <th className="px-4 py-3 text-center font-normal">To</th>
              <th className="px-4 py-3 text-center font-normal">Reason</th>
              <th className="px-4 py-3 text-center font-normal">Applied On</th>
              <th className="px-4 py-3 text-center font-normal">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="border-t text-center bg-white text-gray-700 text-sm hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{leave.leaveType}</td>
                  <td className="px-4 py-3">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{leave.reason}</td>
                  <td className="px-4 py-3">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-500"
                          : leave.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-gray-500 text-center text-sm"
                >
                  No leave records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
