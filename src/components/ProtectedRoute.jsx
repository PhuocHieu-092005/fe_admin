import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
    alert("Tài khoản của bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  //Cho phép đi tiếp vào các Route con
  return <Outlet />;
};

export default ProtectedRoute;
