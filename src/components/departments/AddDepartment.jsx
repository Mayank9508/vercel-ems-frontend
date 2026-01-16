import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router";

const AddDepartment = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const formValues = watch();
  console.log("form values->", formValues);
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/department/add", data);

      if (res.data.success) {
        reset();
        navigate("/dashboard/admin/departments");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-100 mx-auto mt-20 bg-green-100 p-8 rounded-md shadow-md">
      <h2 className="text-2xl mb-6">Add Department</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            {...register("dep_name", {
              required: "Department name is required",
              onChange: (e) => {
                console.log("Department Name:", e.target.value);
              },
            })}
            placeholder="Enter Dep Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          />
          {errors.dep_name && (
            <p className="text-red-500 text-sm">{errors.dep_name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              onChange: (e) => {
                console.log("Description:", e.target.value);
              },
            })}
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? "Adding..." : "Add Department"}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
