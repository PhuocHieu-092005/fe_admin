import React from "react";
import { X, Mail, Phone, MapPin, CalendarDays, User, Hash } from "lucide-react";

export default function StudentDetailCard({
  selectedStudent,
  onClose,
  formatDate,
  getGenderLabel,
}) {
  if (!selectedStudent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-black hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-8 pr-14">
          <h2 className="text-3xl font-black text-slate-900">
            Chi tiết sinh viên
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Thông tin đầy đủ của sinh viên được chọn
          </p>
        </div>

        <div className="mb-8 rounded-3xl bg-blue-50 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <User size={28} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Sinh viên</p>
              <h3 className="text-2xl font-black text-slate-900">
                {selectedStudent.full_name || "Chưa rõ"}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {selectedStudent.email || "Chưa rõ"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Hash size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                MSSV
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {selectedStudent.mssv || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Mail size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Email
              </span>
            </div>
            <p className="break-words text-base font-bold text-slate-900">
              {selectedStudent.email || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Phone size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Số điện thoại
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {selectedStudent.phone || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              GPA
            </p>
            <p className="text-base font-bold text-slate-900">
              {selectedStudent.gpa ?? "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Giới tính
            </p>
            <p className="text-base font-bold text-slate-900">
              {getGenderLabel(selectedStudent.gender)}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Khóa học
            </p>
            <p className="text-base font-bold text-slate-900">
              {selectedStudent.course || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Trạng thái
            </p>
            <p className="text-base font-bold text-slate-900">
              {selectedStudent.status || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 md:col-span-2">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <MapPin size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Địa chỉ
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {selectedStudent.address || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <CalendarDays size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Ngày tạo
              </span>
            </div>
            <p className="text-base font-bold text-slate-900">
              {formatDate(selectedStudent.created_at)}
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
