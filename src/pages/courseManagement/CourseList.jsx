import React, { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, BookOpen, Users } from "lucide-react";
import Swal from "sweetalert2";
import courseService from "../../services/courseService";
import teacherService from "../../services/teacherService";
import CourseTeacherManager from "./CourseTeacherManager";
import CourseFormModal from "./CourseFormModal";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [managingCourse, setManagingCourse] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teacherLoading, setTeacherLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    teachers: [],
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await courseService.getCourses();
      const list = res?.data || [];
      setCourses(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách course:",
        error?.response?.data || error,
      );
      setCourses([]);
      Swal.fire("Lỗi", "Không thể tải danh sách khóa học!", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await teacherService.getTeachers();
      const list = res?.data || [];
      setTeachers(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách teacher:",
        error?.response?.data || error,
      );
      setTeachers([]);
      Swal.fire("Lỗi", "Không thể tải danh sách giảng viên!", "error");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const totalTeachers = useMemo(() => {
    return courses.reduce((sum, item) => sum + (item.teachers?.length || 0), 0);
  }, [courses]);

  const resetForm = () => {
    setFormData({
      name: "",
      teachers: [],
    });
    setEditingCourse(null);
    setOpenForm(false);
  };

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      name: "",
      teachers: [],
    });
    setOpenForm(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name || "",
      teachers: course.teachers || [],
    });
    setOpenForm(true);
  };

  const handleOpenTeacherManager = (course) => {
    setManagingCourse(course);
    setSelectedTeacherId("");
  };

  const closeTeacherManager = () => {
    setManagingCourse(null);
    setSelectedTeacherId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire("Lưu ý", "Vui lòng nhập tên khóa học!", "warning");
      return;
    }

    const payload = {
      id: editingCourse?.id || 0,
      name: formData.name.trim(),
      teachers: formData.teachers || [],
    };

    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, payload);
        Swal.fire("Thành công", "Cập nhật khóa học thành công!", "success");
      } else {
        await courseService.createCourse(payload);
        Swal.fire("Thành công", "Tạo khóa học thành công!", "success");
      }

      resetForm();
      fetchCourses();
    } catch (error) {
      console.error("Lỗi lưu course:", error?.response?.data || error);
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message || "Không thể lưu khóa học!",
        "error",
      );
    }
  };

  const handleDelete = async (course) => {
    const result = await Swal.fire({
      title: "Xóa khóa học?",
      text: `Bạn có chắc muốn xóa khóa học "${course.name}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      await courseService.deleteCourse(course.id);
      Swal.fire("Thành công", "Đã xóa khóa học!", "success");
      fetchCourses();
    } catch (error) {
      console.error("Lỗi xóa course:", error?.response?.data || error);
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message || "Không thể xóa khóa học!",
        "error",
      );
    }
  };

  const handleAssignTeacher = async () => {
    if (!managingCourse) return;

    if (!selectedTeacherId) {
      Swal.fire("Lưu ý", "Vui lòng chọn giảng viên!", "warning");
      return;
    }

    try {
      setTeacherLoading(true);
      await courseService.assignTeacherToCourse(
        managingCourse.id,
        Number(selectedTeacherId),
      );

      Swal.fire(
        "Thành công",
        "Đã phân công giảng viên vào khóa học!",
        "success",
      );

      await fetchCourses();
      setSelectedTeacherId("");
    } catch (error) {
      console.error(
        "Lỗi gán teacher vào course:",
        error?.response?.data || error,
      );
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message || "Không thể phân công giảng viên!",
        "error",
      );
    } finally {
      setTeacherLoading(false);
    }
  };

  const handleRemoveTeacher = async (teacher) => {
    if (!managingCourse) return;

    const result = await Swal.fire({
      title: "Xóa giảng viên khỏi khóa học?",
      text: `Bạn có chắc muốn gỡ "${teacher.employeeCode || teacher.employee_code || "N/A"}" khỏi "${managingCourse.name}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Gỡ",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      setTeacherLoading(true);
      await courseService.removeTeacherFromCourse(
        managingCourse.id,
        teacher.id,
      );

      Swal.fire("Thành công", "Đã gỡ giảng viên khỏi khóa học!", "success");

      await fetchCourses();
    } catch (error) {
      console.error(
        "Lỗi xóa teacher khỏi course:",
        error?.response?.data || error,
      );
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message || "Không thể gỡ giảng viên!",
        "error",
      );
    } finally {
      setTeacherLoading(false);
    }
  };

  const availableTeachersForCurrentCourse = useMemo(() => {
    if (!managingCourse) return teachers;

    const assignedIds = new Set(
      (managingCourse.teachers || []).map((teacher) => teacher.id),
    );

    return teachers.filter((teacher) => !assignedIds.has(teacher.id));
  }, [teachers, managingCourse]);

  useEffect(() => {
    if (!managingCourse) return;
    const freshCourse = courses.find(
      (course) => course.id === managingCourse.id,
    );
    if (freshCourse) {
      setManagingCourse(freshCourse);
    }
  }, [courses, managingCourse]);

  return (
    <div className="min-h-screen bg-white p-8 text-left text-black">
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-black">
            Quản lý khóa học
          </h1>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Tạo, chỉnh sửa và quản lý danh sách khóa học trong hệ thống
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-black text-white transition-all hover:bg-slate-800"
        >
          <Plus size={18} />
          Thêm khóa học
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Tổng khóa học
          </p>
          <h3 className="mt-2 text-3xl font-black text-slate-900">
            {courses.length}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Tổng giảng viên đã gán
          </p>
          <h3 className="mt-2 text-3xl font-black text-slate-900">
            {totalTeachers}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Trạng thái
          </p>
          <h3 className="mt-2 text-lg font-black text-emerald-600">
            Hoạt động ổn định
          </h3>
        </div>
      </div>

      <CourseFormModal
        openForm={openForm}
        editingCourse={editingCourse}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={resetForm}
      />

      <CourseTeacherManager
        managingCourse={managingCourse}
        selectedTeacherId={selectedTeacherId}
        setSelectedTeacherId={setSelectedTeacherId}
        availableTeachers={availableTeachersForCurrentCourse}
        teacherLoading={teacherLoading}
        onAssignTeacher={handleAssignTeacher}
        onRemoveTeacher={handleRemoveTeacher}
        onClose={closeTeacherManager}
      />

      <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="p-6 text-base font-black">ID</th>
                <th className="p-6 text-base font-black">Tên khóa học</th>
                <th className="p-6 text-center text-base font-black">
                  Giảng viên
                </th>
                <th className="p-6 text-right text-base font-black">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      Đang tải dữ liệu...
                    </p>
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-20 text-center text-sm font-medium text-slate-400"
                  >
                    Chưa có khóa học nào.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr
                    key={course.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-6 font-mono text-sm text-slate-500">
                      #{course.id}
                    </td>

                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {course.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            Khóa học trong hệ thống
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-6 text-center">
                      <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">
                          {course.teachers?.length || 0}
                        </span>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-wrap justify-end gap-3">
                        <button
                          onClick={() => handleOpenTeacherManager(course)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-600 transition-all hover:bg-emerald-50"
                        >
                          <Users size={15} />
                          Giảng viên
                        </button>

                        <button
                          onClick={() => handleOpenEdit(course)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 px-4 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50"
                        >
                          <Pencil size={15} />
                          Sửa
                        </button>

                        <button
                          onClick={() => handleDelete(course)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50"
                        >
                          <Trash2 size={15} />
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
