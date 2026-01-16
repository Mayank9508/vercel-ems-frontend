import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const EmpViewSalary = () => {
  const [salaries, setSalaries] = useState([]);

  const fetchMySalary = async () => {
    try {
      const res = await axiosInstance.get("/salary/my-salary");
      if (res.data.success) {
        console.log("salary=", res.data);
        
        setSalaries(res.data.salary);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMySalary();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl text-gray-800 mb-4">My Salary</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-normal">SNO</th>
              <th className="px-4 py-3 font-normal">Basic</th>
              <th className="px-4 py-3 font-normal">Allowance</th>
              <th className="px-4 py-3 font-normal">Deduction</th>
              <th className="px-4 py-3 font-normal">Total</th>
              <th className="px-4 py-3 font-normal">Pay Date</th>
            </tr>
          </thead>

          <tbody>
            {salaries.length > 0 ? (
              salaries.map((sal, index) => (
                <tr key={sal._id} className="border-t text-center">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{sal.basicSalary}</td>
                  <td className="px-4 py-3">{sal.allowances}</td>
                  <td className="px-4 py-3">{sal.deduction}</td>
                  <td className="px-4 py-3 text-teal-600">
                    {sal.netSalary}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(sal.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500 text-center">
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

export default EmpViewSalary;
