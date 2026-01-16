import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../features/auth/AuthSlice";
// import { axiosInstance } from "../../config/axiosInstance";
import userLogoutHook from "../../hooks/userHooks/userLogoutHook";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { mutate: logoutUser, isPending, data, error } = userLogoutHook();
  // console.log("DATA->", data);

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: (data) => {
        console.log("DATA->", data);
        dispatch(removeUser());
      },
      onError: (err) => {
        console.error("Logout failed:", err);
      },
    });
    // console.log("DATA->", data);
  };


  return (
    <div className="flex  w-full items-center justify-between text-white h-12 bg-teal-600 px-5  ">
      <p className="tracking-wider">Welcome {user.name}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded right-80  absolute"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
