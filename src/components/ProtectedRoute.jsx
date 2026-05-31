import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  //Chưa đăng nhập ->  về Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng Role không nằm trong danh sách cho phép
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    Swal.fire({
      icon: "warning",
      title: "Không có quyền truy cập",
      text: "Tài khoản của bạn không được phép truy cập trang này.",
      confirmButtonText: "Đã hiểu",
    });
    return <Navigate to="/" replace />;
  }

  //Cho phép đi tiếp vào các Route con
  return <Outlet />;
};

export default ProtectedRoute;
