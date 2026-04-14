import React, { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
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

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

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
            Xem danh sách, chi tiết và xóa giảng viên trong hệ thống
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Tổng giảng viên
          </p>
          <h3 className="mt-1 text-2xl font-black text-slate-900">
            {teachers.length}
          </h3>
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
    </div>
  );
}
