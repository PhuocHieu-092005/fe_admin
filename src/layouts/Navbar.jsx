import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import notificationService from "../services/notificationService";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const res = await notificationService.getNotifications();
      setNotifications(res);
      setUnreadCount(res.length);
    } catch (err) {
      console.error("Lỗi khi lần đầu load thông báo", err);
    }
  };

  const handleBellClick = async () => {
    setIsShow(!isShow);
    try {
      const res = await notificationService.getNotifications();
      setNotifications(res);
      setUnreadCount(res.length);
      console.log(res);
    } catch (err) {
      console.error("Lỗi khi cập nhật thông báo", err);
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const clickDetailNotification = async (notif) => {
    try {
      setSelectedNotif(notif);
      setShowDetailModal(true);
      if (!notif.read) {
        await notificationService.readNotification(notif.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)),
        );
        setUnreadCount(unreadCount - 1);
      }
    } catch (err) {
      console.error("đã xảy ra lỗi", err);
    }
  };
  const displayName =
    user?.fullName ||
    (user?.role === "TEACHER" ? "Giảng viên" : "Quản trị viên");

  return (
    <>
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
            <div className="relative">
              <button
                className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                onClick={handleBellClick}
              >
                <BellIcon className="w-7 h-7" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 -right-1 w-5 h-5 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold">
                      {unreadCount}
                    </span>
                  </span>
                )}
              </button>
              {isShow && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="p-3 border-b bg-gray-50 font-bold text-sm text-gray-700">
                    Thông báo
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((e) => (
                        <div
                          key={e.id}
                          className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                          onClick={() => clickDetailNotification(e)}
                        >
                          <p className="text-sm text-gray-800 font-medium">
                            {e.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {e.title || "Bạn có thông báo mới"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-center text-sm text-gray-400">
                        Không có thông báo nào
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
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
      {showDetailModal && selectedNotif && (
        //inset 0 bằng với top:0,left:0,right....
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {selectedNotif.type}
              </span>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedNotif.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {new Date(selectedNotif.sentAt).toLocaleString("vi-VN")}
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {selectedNotif.content}
                </p>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
