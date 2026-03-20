const stats = [
  {
    label: "Total CVs",
    value: "1,245",
    icon: "📄",
    color: "text-blue-500",
    growth: "+12%",
  },
  {
    label: "Pending Reviews",
    value: "89",
    icon: "⏳",
    color: "text-orange-500",
  },
  { label: "Rejected", value: "156", icon: "❌", color: "text-red-500" },
  {
    label: "Active Job Posts",
    value: "45",
    icon: "💼",
    color: "text-green-500",
  },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className={`text-3xl p-3 bg-gray-50 rounded-lg ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm">{item.label}</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{item.value}</span>
              {item.growth && (
                <span className="text-green-500 text-xs font-bold">
                  {item.growth}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatCards;
