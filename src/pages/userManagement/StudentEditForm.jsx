import React from "react";
import { X, FilePenLine } from "lucide-react";

export default function StudentEditForm({
  editingStudent,
  formData,
  setFormData,
  onSubmit,
  onClose,
}) {
  if (!editingStudent) return null;

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
            <FilePenLine size={28} />
          </div>

          <h2 className="text-3xl font-black text-slate-900">
            Cập nhật sinh viên
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Chỉ sửa các trường admin được phép cập nhật
          </p>
        </div>

        <div className="mb-6 rounded-3xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Sinh viên đang chỉnh sửa</p>
          <h3 className="mt-1 text-xl font-black text-slate-900">
            {editingStudent.full_name || "Chưa rõ"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {editingStudent.email || "Chưa rõ"}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-600">
              Trạng thái
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
            >
              <option value="">Chọn trạng thái</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>

            <p className="mt-2 text-xs text-slate-400">
              Nếu backend dùng enum khác, hãy đổi lại 3 giá trị này.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-600">
              GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={formData.gpa}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gpa: e.target.value }))
              }
              placeholder="Nhập GPA..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
            />
            <p className="mt-2 text-xs text-slate-400">Nhập nhỏ hơn 10.</p>
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-white transition-all hover:bg-slate-800"
            >
              Lưu cập nhật
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
