import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const displayName =
    user?.fullName ||
    (user?.role === "TEACHER" ? "Giảng viên" : "Quản trị viên");

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
        {/* User Info */}
        <div className="flex items-center gap-3 border-r pr-6 border-gray-100">
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-800">
              {displayName}
            </span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {user?.role || "ADMIN"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100 active:scale-95"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
