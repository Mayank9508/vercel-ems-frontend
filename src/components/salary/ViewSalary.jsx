import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const ViewSalary = () => {
  const { id } = useParams();

  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  const fetchSalaries = async () => {
    try {
      const res = await axiosInstance.get(`/salary/${id}`);
      if (res.data.success) {
        setSalaries(res.data.salary);
        setFilteredSalaries(res.data.salary);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const searchSalary = (e) => {
    const value = e.target.value.toLowerCase();

    const records = salaries.filter((sal) =>
      sal.employeeId?.employeeId?.toLowerCase().includes(value)
    );

    setFilteredSalaries(records);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-gray-800">Salary History</h2>

        <input
          type="text"
          placeholder="Search By Emp ID"
          onChange={searchSalary}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                SNO
              </th>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                EMP ID
              </th>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                SALARY
              </th>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                ALLOWANCE
              </th>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                DEDUCTION
              </th>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                TOTAL
              </th>
              <th className="px-4 py-3 font-normal text-center whitespace-nowrap">
                PAY DATE
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSalaries.length > 0 ? (
              filteredSalaries.map((sal, index) => (
                <tr
                  key={sal._id}
                  className="border-t hover:bg-gray-50 text-center"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {sal.employeeId?.employeeId || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {sal.basicSalary}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {sal.allowances}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {sal.deduction}
                  </td>
                  <td className="px-4 py-3 text-teal-600 whitespace-nowrap">
                    {sal.netSalary}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(sal.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No salary records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSalary;
