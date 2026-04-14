import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import studentService from "../../services/studentService";
import StudentEditForm from "./StudentEditForm";
import StudentDetailCard from "./StudentDetailCard";
import StudentTable from "./StudentTable";

function getReadableErrorMessage(error) {
  const rawMessage =
    error?.response?.data?.data ||
    error?.response?.data?.message ||
    error?.message ||
    "Không thể xử lý yêu cầu.";

  const message = String(rawMessage);

  if (message.includes("Arithmetic overflow error")) {
    return "Giá trị GPA vượt quá kiểu dữ liệu backend cho phép. Hãy thử nhập số nhỏ hơn, ví dụ 8.5 hoặc 9.0.";
  }

  if (message.includes("could not execute statement")) {
    return "Backend không lưu được dữ liệu. Hãy kiểm tra lại giá trị GPA hoặc cấu trúc dữ liệu trong database.";
  }

  if (message.length > 180) {
    return "Có lỗi từ backend khi xử lý dữ liệu. Mở Console/Network để xem chi tiết kỹ thuật.";
  }

  return message;
}

export default function UserList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    gpa: "",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentService.getStudents();
      const list = res?.data || [];
      setStudents(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách sinh viên:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể tải danh sách sinh viên!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleViewDetail = async (id) => {
    try {
      setDetailLoading(true);
      const res = await studentService.getStudentById(id);
      setSelectedStudent(res?.data || null);
    } catch (error) {
      console.error(
        "Lỗi lấy chi tiết sinh viên:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể lấy chi tiết sinh viên!", "error");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      status: student.status || "",
      gpa: student.gpa ?? "",
    });
  };

  const handleCloseEdit = () => {
    setEditingStudent(null);
    setFormData({
      status: "",
      gpa: "",
    });
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    if (!editingStudent) return;

    if (!formData.status) {
      Swal.fire("Lưu ý", "Vui lòng chọn trạng thái!", "warning");
      return;
    }

    if (
      formData.gpa === "" ||
      Number(formData.gpa) < 0 ||
      Number(formData.gpa) > 10
    ) {
      Swal.fire("Lưu ý", "GPA phải nằm trong khoảng từ 0 đến 10!", "warning");
      return;
    }

    const payload = {
      status: formData.status,
      gpa: Number(formData.gpa),
    };

    try {
      await studentService.updateStudentByAdmin(editingStudent.id, payload);

      Swal.fire("Thành công", "Cập nhật sinh viên thành công!", "success");
      handleCloseEdit();
      fetchStudents();
    } catch (error) {
      console.error("Lỗi cập nhật sinh viên:", error?.response?.data || error);
      Swal.fire("Lỗi", getReadableErrorMessage(error), "error");
    }
  };

  const handleDeleteStudent = async (student) => {
    const result = await Swal.fire({
      title: "Xóa sinh viên?",
      text: `Bạn có chắc muốn xóa sinh viên "${student.full_name}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      await studentService.deleteStudentByAdmin(student.id);

      Swal.fire("Thành công", "Đã xóa sinh viên!", "success");

      if (selectedStudent?.id === student.id) {
        setSelectedStudent(null);
      }

      fetchStudents();
    } catch (error) {
      console.error("Lỗi xóa sinh viên:", error?.response?.data || error);
      Swal.fire("Lỗi", getReadableErrorMessage(error), "error");
    }
  };

  const formatDate = (value) => {
    if (!value) return "Chưa rõ";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Chưa rõ";
    return date.toLocaleString("vi-VN");
  };

  const getGenderLabel = (gender) => {
    if (gender === true) return "Nam";
    if (gender === false) return "Nữ";
    return "Chưa rõ";
  };

  return (
    <div className="min-h-screen bg-white p-8 text-left text-black">
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-black">
            Quản lý sinh viên
          </h1>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Xem danh sách, chỉnh sửa và xóa sinh viên trong hệ thống
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Tổng sinh viên
          </p>
          <h3 className="mt-1 text-2xl font-black text-slate-900">
            {students.length}
          </h3>
        </div>
      </div>

      <StudentTable
        students={students}
        loading={loading}
        onViewDetail={handleViewDetail}
        onOpenEdit={handleOpenEdit}
        onDeleteStudent={handleDeleteStudent}
      />

      {detailLoading && (
        <div className="mt-6 text-sm font-medium text-slate-400">
          Đang tải chi tiết sinh viên...
        </div>
      )}

      <StudentEditForm
        editingStudent={editingStudent}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateStudent}
        onClose={handleCloseEdit}
      />

      <StudentDetailCard
        selectedStudent={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        formatDate={formatDate}
        getGenderLabel={getGenderLabel}
      />
    </div>
  );
}
