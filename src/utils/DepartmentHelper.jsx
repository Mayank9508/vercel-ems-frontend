import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

export const columns = [
  {
    name: "S No",
    selector: (row, index) => index+1,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");

    if (confirm) {
      try {
        const res = await axiosInstance.delete(`/department/${id}`);
        if (res.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong");
      }
    }
  };
  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1.5 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/dashboard/admin/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1.5 bg-red-600 text-white rounded"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
