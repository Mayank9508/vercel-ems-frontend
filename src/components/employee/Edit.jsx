import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departmentsData, setDepartmentsData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /*  Fetch Departments  */
  useEffect(() => {
    const loadDep = async () => {
      const depData = await fetchDepartments();
      setDepartmentsData(depData || []);
    };
    loadDep();
  }, []);

  /*  Fetch Employee & Prefill */
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosInstance.get(`/employee/${id}`);
        if (res.data.success) {
          const emp = res.data.employee;

          reset({
            name: emp.userId?.name || "",
            maritalStatus: emp.maritalStatus || "",
            designation: emp.designation || "",
            salary: emp.salary || "",
            department: emp.department?._id || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
  }, [id, reset]);

  
  const submit = async (data) => {
    try {
      const res = await axiosInstance.put(`/employee/edit/${id}`, data);

      if (res.data.success) {
        alert("Employee Updated Successfully");
        navigate("/dashboard/admin/employees");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto mt-20 bg-white rounded shadow-md">
      <h2 className="mb-6 text-center text-2xl font-semibold text-teal-600">
        Edit Employee
      </h2>

      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">Name is required</p>
            )}
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm text-gray-700">
              Marital Status
            </label>
            <select
              className="mt-1 p-2 w-full border rounded"
              {...register("maritalStatus", { required: true })}
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {errors.maritalStatus && (
              <p className="text-red-600 text-sm">
                Marital Status is required
              </p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm text-gray-700">
              Designation
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              {...register("designation", { required: true })}
            />
            {errors.designation && (
              <p className="text-red-600 text-sm">
                Designation is required
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm text-gray-700">Salary</label>
            <input
              type="number"
              className="mt-1 p-2 w-full border rounded"
              {...register("salary", { required: true })}
            />
            {errors.salary && (
              <p className="text-red-600 text-sm">Salary is required</p>
            )}
          </div>

          {/* Department */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700">
              Department
            </label>
            <select
              className="mt-1 p-2 w-full border rounded"
              {...register("department", { required: true })}
            >
              <option value="">Select Department</option>
              {departmentsData.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-600 text-sm">
                Department is required
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;
