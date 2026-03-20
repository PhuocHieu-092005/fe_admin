import {
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Bên trái: Tiêu đề trang */}
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h2>
      </div>

      {/* Bên phải: Profile & Actions */}
      <div className="flex items-center gap-6">
        {/* User Info & Avatar */}
        <div className="flex items-center gap-3 border-r pr-6 border-gray-100">
          <span className="text-sm font-semibold text-gray-700">
            Admin Name
          </span>
          <div className="avatar">
            <div className="w-9 h-9 rounded-full ring ring-gray-100 ring-offset-2">
              <img src="https://i.pravatar.cc/150?u=admin" alt="avatar" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
