import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  UserPlus,
  X,
  Mail,
  KeyRound,
  UserRound,
} from "lucide-react";
import Swal from "sweetalert2";
import teacherService from "../../services/teacherService";
import TeacherDetailCard from "./TeacherDetailCard";
import TeacherTable from "./TeacherTable";

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

const initialTeacherForm = {
  full_name: "",
  email: "",
  password: "123456",
};

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [teacherForm, setTeacherForm] = useState(initialTeacherForm);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await teacherService.getTeachers();
      const list = res?.data || [];
      setTeachers(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách giảng viên:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể tải danh sách giảng viên!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChangeTeacherForm = (event) => {
    const { name, value } = event.target;

    setTeacherForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCreateModal = () => {
    setTeacherForm(initialTeacherForm);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    if (createLoading) return;
    setShowCreateModal(false);
    setTeacherForm(initialTeacherForm);
  };

  const handleCreateTeacherAccount = async (event) => {
    event.preventDefault();

    const fullName = teacherForm.full_name.trim();
    const email = teacherForm.email.trim();
    const password = teacherForm.password.trim();

    if (!fullName || !email || !password) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.",
        "warning",
      );
      return;
    }

    if (!email.includes("@")) {
      Swal.fire(
        "Email không hợp lệ",
        "Vui lòng nhập đúng định dạng email.",
        "warning",
      );
      return;
    }

    if (password.length < 6) {
      Swal.fire(
        "Mật khẩu quá ngắn",
        "Mật khẩu phải có ít nhất 6 ký tự.",
        "warning",
      );
      return;
    }

    try {
      setCreateLoading(true);

      await teacherService.createTeacherAccount({
        full_name: fullName,
        email,
        password,
      });

      Swal.fire(
        "Thành công",
        "Đã cấp tài khoản giảng viên thành công!",
        "success",
      );

      setShowCreateModal(false);
      setTeacherForm(initialTeacherForm);
      fetchTeachers();
    } catch (error) {
      console.error(
        "Lỗi cấp tài khoản giảng viên:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", getReadableErrorMessage(error), "error");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleViewDetail = async (id) => {
    try {
      setDetailLoading(true);
      const res = await teacherService.getTeacherById(id);
      setSelectedTeacher(res?.data || null);
    } catch (error) {
      console.error(
        "Lỗi lấy chi tiết giảng viên:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể lấy chi tiết giảng viên!", "error");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDeleteTeacher = async (teacher) => {
    const result = await Swal.fire({
      title: "Xóa giảng viên?",
      text: `Bạn có chắc muốn xóa giảng viên "${teacher.full_name}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      await teacherService.deleteTeacherById(teacher.id);

      Swal.fire("Thành công", "Đã xóa giảng viên!", "success");

      if (selectedTeacher?.id === teacher.id) {
        setSelectedTeacher(null);
      }

      fetchTeachers();
    } catch (error) {
      console.error("Lỗi xóa giảng viên:", error?.response?.data || error);
      Swal.fire("Lỗi", getReadableErrorMessage(error), "error");
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 text-left text-black">
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-black">
            Quản lý giảng viên
          </h1>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Xem danh sách, chi tiết, xóa và cấp tài khoản đăng nhập cho giảng
            viên
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Cấp tài khoản giảng viên
          </button>

          <div className="rounded-2xl bg-slate-50 px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Tổng giảng viên
            </p>
            <h3 className="mt-1 text-2xl font-black text-slate-900">
              {teachers.length}
            </h3>
          </div>
        </div>
      </div>

      <TeacherTable
        teachers={teachers}
        loading={loading}
        onViewDetail={handleViewDetail}
        onDeleteTeacher={handleDeleteTeacher}
      />

      {detailLoading && (
        <div className="mt-6 text-sm font-medium text-slate-400">
          Đang tải chi tiết giảng viên...
        </div>
      )}

      {!loading && teachers.length === 0 && (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 py-12 text-center">
          <GraduationCap size={44} className="mx-auto mb-4 text-slate-300" />
          <h3 className="text-xl font-bold text-slate-700">
            Chưa có giảng viên nào
          </h3>
          <p className="mt-2 text-slate-500">
            Danh sách dữ liệu teacher hiện chưa có.
          </p>
        </div>
      )}

      <TeacherDetailCard
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Cấp tài khoản giảng viên
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tài khoản này sẽ được tạo với quyền TEACHER.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCreateModal}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleCreateTeacherAccount}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Họ tên giảng viên
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                  <UserRound size={18} className="mr-3 text-slate-400" />
                  <input
                    name="full_name"
                    value={teacherForm.full_name}
                    onChange={handleChangeTeacherForm}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email đăng nhập
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                  <Mail size={18} className="mr-3 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    value={teacherForm.email}
                    onChange={handleChangeTeacherForm}
                    placeholder="teacher@gmail.com"
                    className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Mật khẩu mặc định
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                  <KeyRound size={18} className="mr-3 text-slate-400" />
                  <input
                    name="password"
                    type="text"
                    value={teacherForm.password}
                    onChange={handleChangeTeacherForm}
                    placeholder="123456"
                    className="w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Giang Viên có thể đổi mật khẩu.
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  disabled={createLoading}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  disabled={createLoading}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {createLoading ? "Đang tạo..." : "Tạo tài khoản"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
