import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const Add = () => {
  const navigate = useNavigate();
  const [departmentsData, setDepartmentsData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadDep = async () => {
      const depName = await fetchDepartments();
      setDepartmentsData(depName);
    };

    loadDep();
  }, []);

  const submit = async (data) => {
    const formData = new FormData();
    console.log(data);

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append("image", data.image[0]); //  file
      } else {
        formData.append(key, data[key]); //  text
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); //for Debug
    }

    try {
      const res = await axiosInstance.post("/employee/add", formData);
      if (res.data.success) {
        alert("Form submitted...");
        reset();
        navigate("/dashboard/admin/employees");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };


  return (
    <div className="p-5 max-w-4xl mx-auto m-20 bg-white rounded shadow-md">
      <h2 className="mb-5 text-center text-transparent bg-clip-text bg-linear-to-b from-teal-600 via-blue-500 to-purple-600">
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm  text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-600 font-sans">Name is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="abcd@12gmail.com"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-600 font-sans">Email is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="employee" className="block text-sm text-gray-700">
              Employee ID
            </label>
            <input
              id="employee"
              type="text"
              placeholder="Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("employeeId", { required: true })}
            />
            {errors.employeeId && (
              <p className="text-red-600 font-sans">Employee ID is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              placeholder="DOB"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("dob", { required: true })}
            />
            {errors.dob && (
              <p className="text-red-600 font-sans">
                Date of Birth is required.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Seletc Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 font-sans">Gender is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="MS" className="block text-sm text-gray-700">
              Marital Status
            </label>
            <select
              id="MS"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("maritalStatus", { required: "Gender is required" })}
            >
              <option value="">Seletc Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {errors.maritalStatus && (
              <p className="text-red-600 font-sans">
                Marital Status is required.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="designation"
              className="block text-sm text-gray-700"
            >
              Designation
            </label>
            <input
              id="designation"
              type="text"
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("designation", { required: true })}
            />
            {errors.designation && (
              <p className="text-red-600 font-sans">Designation is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="dep" className="block text-sm text-gray-700">
              Department
            </label>
            <select
              id="dep"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("department", { required: "Gender is required" })}
            >
              <option value="">Seletc Department</option>
              {departmentsData.map((dep) => {
                return (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                );
              })}
            </select>
            {errors.department && (
              <p className="text-red-600 font-sans">Department is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm text-gray-700">
              Salary
            </label>
            <input
              id="salary"
              type="number"
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("salary", { required: true })}
            />
            {errors.salary && (
              <p className="text-red-600 font-sans">Salary is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="pas" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              id="pas"
              type="password"
              placeholder="********"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-600 font-sans">Password is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm text-gray-700">
              Role
            </label>
            <select
              id="role"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("role", { required: "Gender is required" })}
            >
              <option value="">Seletc Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && (
              <p className="text-red-600 font-sans">Role is required.</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm text-gray-700">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-600 font-sans">Image is required.</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
