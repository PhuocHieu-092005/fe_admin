import React, { useEffect, useState } from "react";
import { UserRound, Mail, ShieldCheck, KeyRound, Save } from "lucide-react";
import Swal from "sweetalert2";
import userService from "../../services/userService";

function getReadableErrorMessage(error) {
  const rawMessage =
    error?.response?.data?.data ||
    error?.response?.data?.message ||
    error?.message ||
    "Không thể xử lý yêu cầu.";

  const message = String(rawMessage);

  if (message.length > 180) {
    return "Có lỗi từ backend khi xử lý dữ liệu. Mở Console/Network để xem chi tiết kỹ thuật.";
  }

  return message;
}

const initialPasswordForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function TeacherProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [changingPassword, setChangingPassword] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await userService.getCurrentUser();
      setProfile(res?.data || null);
    } catch (error) {
      console.error(
        "Lỗi lấy thông tin cá nhân:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể tải thông tin cá nhân!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChangePasswordForm = (event) => {
    const { name, value } = event.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const oldPassword = passwordForm.oldPassword.trim();
    const newPassword = passwordForm.newPassword.trim();
    const confirmPassword = passwordForm.confirmPassword.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
      Swal.fire("Thiếu thông tin", "Vui lòng nhập đầy đủ mật khẩu.", "warning");
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire(
        "Mật khẩu quá ngắn",
        "Mật khẩu mới phải có ít nhất 6 ký tự.",
        "warning",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire("Không khớp", "Xác nhận mật khẩu mới không khớp.", "warning");
      return;
    }

    try {
      setChangingPassword(true);

      await userService.changePassword({
        oldPassword,
        newPassword,
      });

      Swal.fire("Thành công", "Đổi mật khẩu thành công!", "success");
      setPasswordForm(initialPasswordForm);
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error?.response?.data || error);
      Swal.fire("Lỗi", getReadableErrorMessage(error), "error");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-1 text-left text-black">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h1 className="text-4xl font-semibold text-black">Thông tin cá nhân</h1>
        <p className="mt-2 text-sm font-medium italic text-slate-400">
          Xem thông tin tài khoản và đổi mật khẩu giảng viên
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 text-sm font-medium text-slate-500">
          Đang tải thông tin cá nhân...
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <UserRound size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Hồ sơ giảng viên
                </h2>
                <p className="text-sm text-slate-500">
                  Thông tin được lấy từ tài khoản đang đăng nhập.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Họ tên
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <UserRound size={18} className="mr-3 text-slate-400" />
                  <input
                    value={profile?.fullName || profile?.full_name || ""}
                    disabled
                    className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Mail size={18} className="mr-3 text-slate-400" />
                  <input
                    value={profile?.email || ""}
                    disabled
                    className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Vai trò
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <ShieldCheck size={18} className="mr-3 text-slate-400" />
                  <input
                    value={profile?.role || "TEACHER"}
                    disabled
                    className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-700">
                Hiện backend chưa có API cập nhật họ tên cho giảng viên, nên
                phần họ tên đang để chỉ xem. Có thể đổi mật khẩu bằng form bên
                cạnh.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <KeyRound size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Đổi mật khẩu
                </h2>
                <p className="text-sm text-slate-500">
                  Giảng viên có thể tự đổi mật khẩu đăng nhập.
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Mật khẩu hiện tại
                </label>
                <input
                  name="oldPassword"
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={handleChangePasswordForm}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Mật khẩu mới
                </label>
                <input
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handleChangePasswordForm}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handleChangePasswordForm}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={changingPassword}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {changingPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
