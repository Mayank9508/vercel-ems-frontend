import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    // grow: 1.5,
  },
  {
    name: "Profile",
    cell: (row) => row.profileImage,
    width: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name || "N/A",
    grow: 1,
    wrap: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "110px",
  },
  {
    name: "Action",
    cell: (row) => row.action,
    grow: 2,
    minWidth: "350px",
  },
];

export const customStyles = {
  table: {
    style: {
      borderRadius: "5px",
      overflow: "hidden",
    },
  },

  headRow: {
    style: {
      backgroundColor: "#0f766e", // teal-700
      height: "50px",
    },
  },

  headCells: {
    style: {
      color: "#ffffff",
      fontSize: "18px",
      fontWeight: "100",
      //   textTransform: "uppercase",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },

  rows: {
    style: {
      height: "55px",
      fontSize: "14px",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },

  cells: {
    style: {
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
};

export const fetchDepartments = async () => {
  try {
    const res = await axiosInstance.get("/department");

    if (res.data.success) {
      return res.data.departments;
    }
  } catch (error) {
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    }
  }
};

// fetch Employee
export const getEmployees = async (id) => {
  try {
    const res = await axiosInstance.get(`/employee/department/${id}`);

    if (res.data.success) {
      return res.data.employees;
    }
  } catch (error) {
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    }
  }
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1.5 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/dashboard/admin/employee/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1.5 bg-yellow-600 text-white rounded"
        onClick={() => navigate(`/dashboard/admin/employee/edit/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1.5 bg-green-600 text-white rounded"
        onClick={() => navigate(`/dashboard/admin/employee/salary/${Id}`)}
      >
        Salary
      </button>

      <button
        className="px-3 py-1.5 bg-red-600 text-white rounded"
        onClick={() => navigate(`/dashboard/admin/employee/leave-history/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};
