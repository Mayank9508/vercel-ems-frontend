import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthLayout = () => {
  // const [toggle, setToggle] = useState(false);
  return (
    <div>
      {/* {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Register setToggle={setToggle} />
      )} */}
      <Login />
    </div>
  );
};

export default AuthLayout;
