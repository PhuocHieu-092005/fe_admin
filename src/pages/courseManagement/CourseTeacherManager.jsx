import React from "react";
import { X, UserPlus, UserMinus, GraduationCap, Users } from "lucide-react";

export default function CourseTeacherManager({
  managingCourse,
  selectedTeacherId,
  setSelectedTeacherId,
  availableTeachers,
  teacherLoading,
  onAssignTeacher,
  onRemoveTeacher,
  onClose,
}) {
  if (!managingCourse) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-black hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-8 pr-14">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <GraduationCap size={28} />
          </div>

          <h2 className="text-3xl font-black text-slate-900">
            Quản lý giảng viên cho khóa học
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Khóa học:{" "}
            <span className="font-bold text-slate-700">
              {managingCourse.name}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="mb-4 text-lg font-black text-slate-900">
              Phân công giảng viên
            </h3>

            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all focus:border-black"
            >
              <option value="">Chọn giảng viên...</option>
              {availableTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.full_name} -{" "}
                  {teacher.employee_code || teacher.employeeCode}
                </option>
              ))}
            </select>

            {availableTeachers.length === 0 && (
              <p className="mt-3 text-sm text-slate-400">
                Không còn giảng viên nào để gán cho khóa học này.
              </p>
            )}

            <button
              onClick={onAssignTeacher}
              disabled={teacherLoading}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-black text-white transition-all hover:bg-slate-800 disabled:opacity-60"
            >
              <UserPlus size={16} />
              Gán giảng viên
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="text-lg font-black text-slate-900">
                Danh sách giảng viên đang phụ trách
              </h3>
            </div>

            <div className="divide-y divide-slate-50">
              {(managingCourse.teachers || []).length === 0 ? (
                <div className="p-10 text-center">
                  <Users size={36} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-400">
                    Chưa có giảng viên nào được phân công.
                  </p>
                </div>
              ) : (
                managingCourse.teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {teacher.full_name || "Chưa có tên"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {teacher.employee_code || teacher.employeeCode || "N/A"}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveTeacher(teacher)}
                      disabled={teacherLoading}
                      className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 disabled:opacity-60"
                    >
                      <UserMinus size={15} />
                      Gỡ khỏi khóa học
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-white transition-all hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
