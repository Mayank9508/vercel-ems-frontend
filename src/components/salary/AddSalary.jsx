import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const AddSalary = () => {
  const navigate = useNavigate();
  // const { id } = useParams();

  const [departmentsData, setDepartmentsData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDepartmentId = watch("department");
  console.log(selectedDepartmentId);

  /*  Fetch Departments  */
  useEffect(() => {
    const loadDep = async () => {
      const depData = await fetchDepartments();
      setDepartmentsData(depData || []);
    };
    loadDep();
  }, []);

  // fetch Employee Id
  useEffect(() => {
    if (!selectedDepartmentId) return;

    const loadEmployees = async () => {
      const emps = await getEmployees(selectedDepartmentId);
      setEmployeeData(emps || []);
    };

    loadEmployees();
  }, [selectedDepartmentId]);


  const submit = async (data) => {
    console.log("data = ", data);

    try {
      const res = await axiosInstance.post(`/salary/add`, data);
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
    <>
      {departmentsData && employeeData ? (
        <div className="p-5 max-w-4xl mx-auto mt-20 bg-white rounded shadow-md">
          <h2 className="mb-6 text-center text-2xl  text-teal-600">
            Add Salary
          </h2>

          <form onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div className="">
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
                  <p className="text-red-600 text-sm">Department is required</p>
                )}
              </div>

              {/* Employee */}
              <div className="">
                <label className="block text-sm text-gray-700">Employee</label>
                <select
                  className="mt-1 p-2 w-full border rounded"
                  {...register("employeeId", { required: true })}
                >
                  <option value="">Select Employee</option>
                  {employeeData.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <p className="text-red-600 text-sm">
                    Employee Id is required
                  </p>
                )}
              </div>

              {/* Basic Salary */}
              <div>
                <label className="block text-sm text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  {...register("basicSalary", { required: true })}
                />
                {errors.basicSalary && (
                  <p className="text-red-600 text-sm">
                    Basic Salary is required
                  </p>
                )}
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-sm text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  {...register("allowances", { required: true })}
                />
                {errors.allowances && (
                  <p className="text-red-600 text-sm">Allowances is required</p>
                )}
              </div>

              {/* deduction */}
              <div>
                <label className="block text-sm text-gray-700">Deduction</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  {...register("deduction", { required: true })}
                />
                {errors.deduction && (
                  <p className="text-red-600 text-sm">Deduction is required</p>
                )}
              </div>

              {/* Pay date */}
              <div>
                <label className="block text-sm text-gray-700">Pay Date</label>
                <input
                  type="date"
                  className="mt-1 p-2 w-full border rounded"
                  {...register("payDate", { required: true })}
                />
                {errors.payDate && (
                  <p className="text-red-600 text-sm">Pay Date is required</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Upadte Salary
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AddSalary;
