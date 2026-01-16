import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AdminSetting = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put("/auth/forgot-password", {
        email: data.email,
        password: data.password,
      });

      if (res.data.success) {
        toast.success("Password updated successfully");
        reset();

        setTimeout(() => {
          navigate("/dashboard/employee");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl  text-gray-800 text-center mb-6">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Registered Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AdminSetting;
