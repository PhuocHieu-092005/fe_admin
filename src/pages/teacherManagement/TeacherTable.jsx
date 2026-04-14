import React from "react";
import { Eye, Trash2, GraduationCap } from "lucide-react";

export default function TeacherTable({
  teachers,
  loading,
  onViewDetail,
  onDeleteTeacher,
}) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="p-6 text-base font-black">ID</th>
              <th className="p-6 text-base font-black">Giảng viên</th>
              <th className="p-6 text-base font-black">Mã GV</th>
              <th className="p-6 text-base font-black">User ID</th>
              <th className="p-6 text-right text-base font-black">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-20 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Đang tải dữ liệu...
                  </p>
                </td>
              </tr>
            ) : teachers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-20 text-center text-sm font-medium text-slate-400"
                >
                  Chưa có giảng viên nào.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="p-6 font-mono text-sm text-slate-500">
                    #{teacher.id}
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          {teacher.full_name || "Chưa rõ"}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {teacher.email || "Chưa rõ"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 font-semibold text-slate-700">
                    {teacher.employee_code || teacher.employeeCode || "Chưa rõ"}
                  </td>

                  <td className="p-6 font-semibold text-slate-700">
                    {teacher.user_id ?? teacher.userId ?? "Chưa rõ"}
                  </td>

                  <td className="p-6">
                    <div className="flex flex-wrap justify-end gap-3">
                      <button
                        onClick={() => onViewDetail(teacher.id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                      >
                        <Eye size={15} />
                        Xem
                      </button>

                      <button
                        onClick={() => onDeleteTeacher(teacher)}
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
  );
}
