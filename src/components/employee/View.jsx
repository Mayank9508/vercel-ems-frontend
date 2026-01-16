import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/employee/${id}`);
      if (res.data.success) {
        console.log("res->", res.data);

        setEmployee(res.data.employee);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!employee) {
    return <p className="text-center mt-10">No Employee Found</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-gray-800">Employee Details</h2>
        <Link
          to="/dashboard/admin/employees"
          className="px-6 py-1 bg-gray-600 text-white rounded"
        >
          Back
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto mt-10">
        <div className="relative bg-white/70 backdrop-blur-xl shadow-2xl rounded overflow-hidden">
          {/* Header Gradient */}
          <div className="h-32 bg-linear-to-r from-teal-500 to-cyan-500"></div>

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 px-8 pb-8 -mt-16">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div className="w-36 h-36 rounded-full border border-white overflow-hidden bg-gray-100">
                <img
                  src={employee.userId?.profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 mt-4 md:mt-12">
              <h2 className="text-2xl  text-gray-800">
                {employee.userId?.name}
              </h2>
              <p className="text-sm text-gray-500">
                Employee ID • {employee.employeeId}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <InfoCard
                  label="Date of Birth"
                  value={new Date(employee.dob).toLocaleDateString()}
                />
                <InfoCard label="Gender" value={employee.gender} />
                <InfoCard
                  label="Department"
                  value={employee.department?.dep_name || "Not Assigned"}
                />
                <InfoCard
                  label="Marital Status"
                  value={employee.maritalStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="bg-white rounded shadow-sm p-2 border border-gray-100">
    <p className=" text-gray-500 mb-1">{label}</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default View;
