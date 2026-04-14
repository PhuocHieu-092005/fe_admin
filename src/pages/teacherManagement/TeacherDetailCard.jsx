import React from "react";
import { X, GraduationCap, Mail, Hash, User } from "lucide-react";

export default function TeacherDetailCard({ teacher, onClose }) {
  if (!teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-black hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-8 pr-14">
          <h2 className="text-3xl font-black text-slate-900">
            Chi tiết giảng viên
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Thông tin đầy đủ của giảng viên được chọn
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4 rounded-3xl bg-emerald-50 p-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
            <GraduationCap size={30} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Giảng viên</p>
            <h3 className="text-2xl font-black text-slate-900">
              {teacher.full_name || "Chưa rõ"}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {teacher.employee_code ||
                teacher.employeeCode ||
                "Chưa có mã giảng viên"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Hash size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                ID
              </span>
            </div>
            <p className="text-lg font-black text-slate-900">#{teacher.id}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Mail size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Email
              </span>
            </div>
            <p className="break-words text-base font-bold text-slate-900">
              {teacher.email || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <GraduationCap size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Mã giảng viên
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {teacher.employee_code || teacher.employeeCode || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <User size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                User ID
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {teacher.user_id ?? teacher.userId ?? "Chưa rõ"}
            </p>
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
