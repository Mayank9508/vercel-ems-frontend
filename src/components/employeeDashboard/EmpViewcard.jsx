import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const EmpViewCard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className={`rounded-2xl shadow-lg p-4 text-white bg-teal-600
      transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="opacity-90">Welcome Back</p>
          <h2 className="text-3xl mt-1">{user.name}</h2>
        </div>

        <div className="bg-white/20 p-4 rounded-full">
          <FaUser />
        </div>
      </div>
    </div>
  );
};

export default EmpViewCard;
