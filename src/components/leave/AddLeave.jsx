import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";

const AddLeave = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Leave Data:", data);
    try {
      const res = await axiosInstance.post(`leave/add`, data);
      if (res.data.success) {
        console.log("res->", res.data);
        navigate("/dashboard/employee/leaves");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl mb-6  text-gray-800">Request for Leave</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-5">
          {/* Leave Type */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              {...register("leaveType", { required: "Leave type is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
            {errors.leaveType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.leaveType.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                {...register("endDate", {
                  required: "End date is required",
                })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("reason", {
                required: "Reason is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              })}
              placeholder="Reason"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
              rows={4}
            ></textarea>
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-teal-600 text-white hover:bg-teal-700 py-2 px-4 rounded transition duration-200"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
