import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/AuthSlice";

const Register = ({ setToggle }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("auth/register", data);

      if (res.data.success) {
        alert("Registration successful");
        dispatch(setUser(res.data.user));
        setError("");
        reset();
      }
    } catch (error) {
      console.log("register error", error);
      setError(error.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="text-3xl font-['Changa_One'] text-white mb-8">
        {/* Employee Management System */}ERP
      </h2>

      <div className="bg-gray-100 w-full max-w-xs shadow-lg p-6">
        <h2 className="text-2xl font-['Changa_One'] mb-6 text-gray-700">
          Register
        </h2>

        <p className="text-red-500 font-['Changa_One']">{error || ""}</p>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="space-y-4 font-['Changa_One']"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="******"
              className="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Role</label>
            <select
              className="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("role", {
                required: "Role is required",
              })}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700 transition disabled:opacity-60"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:text-red-500 transition"
              onClick={() => setToggle(true)}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
