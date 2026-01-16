import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { columns } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const AdminLeaveList = () => {
  const [status, setStatus] = useState("All");
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#0F766E",
      },
    },
    headCells: {
      style: {
        color: "#ffffff",
        fontWeight: "100",
        fontSize: "14px",
      },
    },
  };

  const baseBtn =
    "px-4 py-1.5 rounded-md text-sm font-medium border transition-colors duration-200";

  // 🔹 FETCH LEAVES
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/leave");

      if (res.data?.success) {
        const data = res.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: index + 1,
          employeeId: leave.employeeId?.employeeId || "—",
          name: leave.employeeId?.userId?.name || "—",
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || "—",
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status, // Pending | Approved | Rejected
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      alert("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 🔹 FILTER LOGIC
  useEffect(() => {
    let data = [...leaves];

    // search by employeeId
    if (search.trim()) {
      data = data.filter((item) =>
        item.employeeId.toLowerCase().includes(search.toLowerCase())
      );
    }

    // status filter
    if (status !== "All") {
      data = data.filter((item) => item.status === status);
    }

    setFilteredLeaves(data);
  }, [search, status, leaves]);

  return (
    <div className="p-6 rounded mt-12">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h3 className="text-xl text-gray-800">Leaves</h3>
        <p className="text-sm text-gray-500">Manage employee leave requests</p>
      </div>

      {/* Top Actions */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Employee ID (emp14)"
          className="px-3 py-2 w-60 text-sm bg-white border border-gray-400 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Status Filter */}
        <div className="flex gap-2">
          {["All", "Pending", "Approved", "Rejected"].map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`${baseBtn} ${
                status === item
                  ? item === "Pending"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                    : item === "Approved"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : item === "Rejected"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          Loading...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          highlightOnHover
          customStyles={customStyles}
          noDataComponent="No leave records found"
        />
      )}
    </div>
  );
};

export default AdminLeaveList;
