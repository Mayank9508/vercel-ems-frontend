import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Watch for live changes
  const formValues = watch();
  useEffect(() => {
    console.log("Live form values:", formValues);
  }, [formValues]);

//   const fetchDepartment = async () => {
//     try {
//       const res = await axiosInstance.get(`/department/${id}`);
//       if (res.data.success) {
//         reset(res.data.department);
//       }
//     } catch (error) {
//       alert(error.response?.data?.error || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     fetchDepartment();
//   }, [id]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put(`/department/${id}`, data);
      if (res.data.success) {
        alert("Department updated successfully!");
        navigate("/dashboard/admin/departments");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="max-w-100 mx-auto mt-20 bg-green-100 p-8 rounded-md shadow-md w-full">
      <h2 className="text-2xl mb-6">Edit Department</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Department Name */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            {...register("dep_name", {
              required: "Department name is required",
            })}
            placeholder="Enter Dep Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          />
          {errors.dep_name && (
            <p className="text-red-500 text-sm">{errors.dep_name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? "Editing..." : "Edit Department"}
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
