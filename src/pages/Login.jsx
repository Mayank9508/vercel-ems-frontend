import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/AuthSlice";
// import { useNavigate } from "react-router";

const Login = () => {
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
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.success) {
        alert("Successfully login");
        dispatch(setUser(res.data.user));
        setError("");
      }

      console.log(res);

      reset();
    } catch (error) {
      console.log("login error", error);
      setError(error.response?.data?.message || "Server Error");
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="text-4xl font-['Changa_One'] text-white mb-8">
        {/* Employee Management System */} Office Setu
      </h2>

      <div className="bg-gray-100 w-full max-w-xs shadow-lg p-6">
        <h2 className="text-2xl  font-['Changa_One'] mb-6 text-gray-700">
          Login
        </h2>
        {/* {error && <p className="text-red-500 font-['Changa_One']">{error}</p>} */}
        <p className="text-red-500 font-['Changa_One'] ">{error || ""}</p>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="space-y-4 font-['Changa_One']"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="px-3 py-2 border  focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="px-3 py-2 border  focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label>
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forget password
            </a>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700 transition disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* <p className="text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:text-red-500 transform"
              onClick={() => setToggle(false)}
            >
              Register
            </span>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
