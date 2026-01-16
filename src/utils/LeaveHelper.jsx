import { useNavigate } from "react-router";

const statusStyle = {
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "150px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "170px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    width: "130px",
    cell: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          statusStyle[row.status]
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Action",
    cell: (row) => <LeaveButtons Id={row._id} />,
    center: true,
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/dashboard/admin/leave/${Id}`)}
      className="px-3 py-1.5 text-sm font-medium text-teal-700
                 bg-teal-50 border border-teal-200 rounded-md
                 hover:bg-teal-100 transition"
    >
      View
    </button>
  );
};
