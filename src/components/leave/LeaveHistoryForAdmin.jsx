import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const statusStyle = {
  Approved: "bg-green-500",
  Rejected: "bg-red-500",
  Pending: "bg-yellow-500",
};

const LeaveHistoryForAdmin = () => {
  const { id } = useParams(); // employeeId
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployeeLeaves = async () => {
    try {
      const res = await axiosInstance.get(
        `/leave/admin/employee/${id}`
      );

      if (res.data.success) {
        setLeaves(res.data.leaves);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeLeaves();
  }, [id]);

  const filteredLeaves = leaves.filter((leave) =>
    leave.leaveType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 ">
      <h1 className="text-2xl text-center mb-6">
        Employee Leave History
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Leave Type"
        className="px-4 py-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 font-normal">SNO</th>
              <th className="p-3 font-normal">Leave Type</th>
              <th className="p-3 font-normal">From</th>
              <th className="p-3 font-normal">To</th>
              <th className="p-3 font-normal">Reason</th>
              <th className="p-3 font-normal">Applied On</th>
              <th className="p-3 font-normal">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={leave._id} className="border-t text-center">
                <td className="p-3 font-medium">{index + 1}</td>
                <td className="p-3">{leave.leaveType}</td>
                <td className="p-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3">
                  {new Date(leave.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`text-white px-3 py-1 rounded text-sm ${statusStyle[leave.status]}`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredLeaves.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Leave Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistoryForAdmin;
