const ViewCard = ({ icon, text, num, color }) => {
  return (
    <div
      className={`rounded-2xl shadow-lg p-4 text-white ${color}
      transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="opacity-90">{text}</p>
          <h2 className="text-3xl mt-1">{num}</h2>
        </div>

        <div className="bg-white/20 p-4 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
