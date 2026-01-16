import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const EmpLeaveDetails = () => {
  const { id } = useParams();

  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLeave = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/leave/detail/${id}`);
      if (res.data.success) {
        setLeave(res.data.leave);
      }
    } catch (error) {
      console.error("Fetch leave error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      const res = await axiosInstance.put(`/leave/update-status/${id}`, {
        status,
      });

      if (res.data.success) {
        setLeave(res.data.leave); // 🔥 UI auto update
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!leave) return <p className="text-center mt-10">No Leave Found</p>;

  const employee = leave.employeeId;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-gray-800">Leave Details</h2>
        <Link
          to="/dashboard/admin/leaves"
          className="px-6 py-1 bg-gray-600 text-white rounded"
        >
          Back
        </Link>
      </div>

      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white shadow-2xl rounded overflow-hidden">
          <div className="h-32 bg-linear-to-r from-teal-500 to-cyan-500"></div>

          <div className="flex flex-col md:flex-row gap-8 px-8 pb-8 -mt-16">
            <div className="flex justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden">
                <img
                  src={
                    employee?.userId?.profileImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 mt-10">
              <h2 className="text-2xl">
                {employee?.userId?.name}
              </h2>
              <p className="text-gray-500">
                Employee ID • {employee?.employeeId}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <InfoCard label="Leave Type" value={leave.leaveType} />
                <InfoCard label="Reason" value={leave.reason} />
                <InfoCard
                  label="Department"
                  value={employee?.department?.dep_name}
                />
                <InfoCard
                  label="Start Date"
                  value={new Date(leave.startDate).toLocaleDateString()}
                />
                <InfoCard
                  label="End Date"
                  value={new Date(leave.endDate).toLocaleDateString()}
                />
                <InfoCard
                  label="Applied On"
                  value={new Date(leave.createdAt).toLocaleDateString()}
                />
              </div>

              <div className="mt-6">
                <p className=" mb-2">
                  {leave.status === "Pending" ? "Action" : "Status"}
                </p>

                {leave.status === "Pending" ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus("Approved")}
                      className="px-4 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus("Rejected")}
                      className="px-4 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className=" text-gray-700">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="bg-white rounded shadow-sm p-3 border">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

export default EmpLeaveDetails;
