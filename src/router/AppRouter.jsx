import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminDashboard from "../pages/AdminDashboard";
import AuthLayout from "../layouts/AuthLayout";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import DashboardProtectRoute from "../components/DashboardProtectRoute";
import AuthProtectRoute from "../components/AuthProtectRoute";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { removeUser, setAuthChecked, setUser } from "../features/auth/AuthSlice";
import AdminView from "../components/adminDashboard/AdminView";
import DepartmentList from "../components/departments/DepartmentList";
import AddDepartment from "../components/departments/AddDepartment";
import EditDepartment from "../components/departments/EditDepartment";
import List from "../components/employee/List";
import Add from "../components/employee/Add";
import View from "../components/employee/View";
import Edit from "../components/employee/Edit";
import AddSalary from "../components/salary/AddSalary";
import ViewSalary from "../components/salary/ViewSalary";
import EmployeeView from "../components/employeeDashboard/EmployeeView";
import LeaveList from "../components/leave/LeaveList";
import AddLeave from "../components/leave/AddLeave";
import EmpViewSalary from "../components/salary/EmpViewSalary";
import EmpSetting from "../components/employeeDashboard/EmpSetting";
import AdminLeaveList from "../components/leave/AdminLeaveList";
import EmpLeaveDetails from "../components/leave/EmpLeaveDetails";
import LeaveHistoryForAdmin from "../components/leave/LeaveHistoryForAdmin";
import AdminSetting from "../components/adminDashboard/AdminSetting";

const AppRouter = () => {
  const dispatch = useDispatch();
  let fetchCurrentUser = async () => {
    try {
      let res = await axiosInstance.get("/auth/current-user");

      if (res) {
        dispatch(setUser(res.data.user));
        dispatch(setAuthChecked());
      }
    } catch (error) {
      console.log("API ERROR", error.response?.data);
      console.log("STATUS", error.response?.status);
      dispatch(removeUser());
      dispatch(setAuthChecked());
      // console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProtectRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardProtectRoute />,
      children: [
        {
          path: "admin",
          element: <AdminDashboard />,
          children: [
            //default dashboard
            {
              index: true,
              element: <AdminView />,
            },

            //department section
            {
              path: "departments",
              element: <DepartmentList />,
            },
            {
              path: "add-department",
              element: <AddDepartment />,
            },
            {
              path: "department/:id",
              element: <EditDepartment />,
            },

            //employee section
            {
              path: "employees",
              element: <List />,
            },
            {
              path: "add-employee",
              element: <Add />,
            },
            {
              path: "employee/:id",
              element: <View />,
            },
            {
              path: "employee/edit/:id",
              element: <Edit />,
            },
            {
              path: "employee/salary/:id",
              element: <ViewSalary />,
            },

            //Salary section
            {
              path: "salary/add",
              element: <AddSalary />,
            },

            //Leaves section            
            {
              path: "leaves",
              element: <AdminLeaveList />,
            },
            {
              path: "leave/:id",
              element: <EmpLeaveDetails />,
            },
            {
              path: "employee/leave-history/:id",
              element: <LeaveHistoryForAdmin />,
            },

            //Setting section
            {
              path: "setting",
              element: <AdminSetting />,
            },
          ],
        },
        {
          path: "employee",
          element: <EmployeeDashboard />,
          children: [
            //default dashboard
            {
              index: true,
              element: <EmployeeView />, //summary component
            },

            //profile section
            {
              path: "profile/:id",
              element: <View />, 
            },

            //Leave section
            {
              path: "leaves",
              element: <LeaveList />, 
            },
             {
              path: "add-leave",
              element: <AddLeave />, 
            },

            //salary section
            {
              path: "salary",
              element: <EmpViewSalary />,
            },

            //setting section
            {
              path: "setting",
              element: <EmpSetting />,
            },
          ]
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
