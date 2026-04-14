import React from "react";
import { X, BookOpen } from "lucide-react";

export default function CourseFormModal({
  openForm,
  editingCourse,
  formData,
  setFormData,
  onSubmit,
  onClose,
}) {
  if (!openForm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-black hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-8 pr-14">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BookOpen size={28} />
          </div>

          <h2 className="text-3xl font-black text-slate-900">
            {editingCourse ? "Cập nhật khóa học" : "Tạo khóa học mới"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Nhập thông tin khóa học để lưu vào hệ thống
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-600">
              Tên khóa học
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập tên khóa học..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-white transition-all hover:bg-slate-800"
            >
              {editingCourse ? "Lưu cập nhật" : "Tạo khóa học"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-600 transition-all hover:bg-slate-50"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
