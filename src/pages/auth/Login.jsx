import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        email: email,
        password: password,
        role: role,
      };

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        payload,
      );
      const responseData = response.data;

      if (responseData && responseData.data) {
        // Phân rã dữ liệu từ object data của Backend
        const {
          access_token,
          role: userRole,
          full_name,
          avatar_url,
          email
        } = responseData.data;

        if (userRole !== "ADMIN" && userRole !== "TEACHER") {
          setError("Tài khoản không có quyền truy cập.");
          setIsLoading(false);
          return;
        }
        // Truyền 4 tham số vào hàm login của Context
        login(access_token, userRole, full_name, avatar_url,email);
        navigate("/");
      } else {
        setError(responseData.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      console.error("Lỗi login:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Hệ thống Quản trị
        </h2>

        {error && (
          <div className="bg-rose-100 text-rose-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đăng nhập với tư cách
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
            >
              <option value="ADMIN">Quản trị viên (Admin)</option>
              <option value="TEACHER">Giảng viên (Teacher)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="admin@hitu.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3.5 rounded-lg text-white transition-all flex justify-center items-center mt-2 ${
              isLoading
                ? "bg-slate-500 cursor-wait"
                : "bg-slate-900 hover:bg-indigo-600 shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? "Đang xác thực..." : "Đăng nhập hệ thống"}
          </button>
        </form>
      </div>
    </div>
  );
}
