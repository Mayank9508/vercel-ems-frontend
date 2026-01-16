import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { axiosInstance } from "../../config/axiosInstance";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = (id) => {
    console.log(departments);
    setDepartments((prev) => prev.filter((dep) => dep._id !== id));
    setFilteredDepartments((prev) => prev.filter((dep) => dep._id !== id));
  };

  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get("/department");
      console.log("dapartments get -> ", res);

      if (res.data.success) {
        const data = await res.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));

        console.log("data->", data);

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  console.log("departments aaya fetch hone pr->", departments);

  const searchDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      <div className="p-5">
        <div className="text-center">
          <h3>Manage Department</h3>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search By Department Name"
            className="px-4 py-1 bg-white w-60 rounded"
            onChange={searchDepartments}
          />
          <Link
            to="/dashboard/admin/add-department"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Department
          </Link>
        </div>
        <div className="mt-2 text-2xl rounded overflow-hidden ">
          <DataTable
            columns={columns}
            // data={departments}
            data={filteredDepartments}
            keyField="_id"
            pagination
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "#0f766e",
                },
              },
              headCells: {
                style: {
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "200",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DepartmentList;
