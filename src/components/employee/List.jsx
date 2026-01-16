import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  columns,
  customStyles,
  EmployeeButtons,
} from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import { axiosInstance } from "../../config/axiosInstance";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filterEmployee, setFilterEmployee] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/employee");
      console.log("Employees get -> ", res);

      if (res.data.success) {
        const data = res.data.employees.map((emp, index) => ({
          _id: emp._id,
          sno: index + 1,
          dep_name: emp.department?.dep_name || "Not Assigned",
          name: emp.userId?.name || "N/A",
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: emp.userId?.profileImage ? (
            <img
              src={emp.userId.profileImage}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            "No Image"
          ),
          action: <EmployeeButtons Id={emp._id} />,
        }));

        // console.log("data->", data);

        setEmployees(data);
        setFilterEmployee(data);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const searchEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterEmployee(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3>Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-1 bg-white w-60 rounded"
          onChange={searchEmployees}
        />
        <Link
          to="/dashboard/admin/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-2 rounded">
        <DataTable
          columns={columns}
          // data={employees}
          data={filterEmployee}
          customStyles={customStyles}
          highlightOnHover
          striped
          dense
          pagination
          responsive
        />
      </div>
    </div>
  );
};

export default List;
