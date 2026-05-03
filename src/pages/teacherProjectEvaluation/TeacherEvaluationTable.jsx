import React from "react";
import { getProjectStatusMeta } from "./teacherProjectEvaluationUtils";

export default function TeacherEvaluationTable({
  projects,
  drafts,
  loading,
  loadingPreviousEvaluations,
  submittingId,
  onDraftChange,
  onOpenProjectDetail,
  onSubmit,
}) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-lg font-black text-slate-900">
          Danh sách đồ án cần đánh giá
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Giảng viên có thể xem chi tiết đồ án trước và chỉnh sửa trực tiếp
          trên nội dung đánh giá đã được hiển thị sẵn
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1280px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="p-6 text-base font-black">Đồ án</th>
              <th className="p-6 text-base font-black">Sinh viên</th>
              <th className="p-6 text-base font-black">Học phần</th>
              <th className="p-6 text-center text-base font-black">
                Trạng thái đồ án
              </th>
              <th className="p-6 text-center text-base font-black">
                Đánh giá
              </th>
              <th className="p-6 text-center text-base font-black">
                Chi tiết
              </th>
              <th className="p-6 text-base font-black">Nhận xét</th>
              <th className="p-6 text-right text-base font-black">Lưu</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="8" className="p-20 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Đang tải dữ liệu...
                  </p>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="p-20 text-center text-sm font-medium text-slate-400"
                >
                  Chưa có đồ án nào thuộc phạm vi giảng viên phụ trách để đánh
                  giá.
                </td>
              </tr>
            ) : (
              projects.map((project) => {
                const projectStatus = getProjectStatusMeta(project.status);
                const isSubmitting = submittingId === project.id;

                return (
                  <tr
                    key={project.id}
                    className="align-top transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-6">
                      <p className="font-bold text-slate-900">
                        {project.projectTitle}
                      </p>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        #{project.id}
                      </p>
                    </td>

                    <td className="p-6 text-sm font-semibold text-slate-700">
                      {project.studentName}
                    </td>

                    <td className="p-6 text-sm font-medium text-slate-600">
                      {project.courseName}
                    </td>

                    <td className="p-6 text-center">
                      <span
                        className={`inline-flex rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-wider ${projectStatus.className}`}
                      >
                        {projectStatus.label}
                      </span>
                    </td>

                    <td className="p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-wider ${
                            project.hasEvaluation
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {project.hasEvaluation ? "Đã tạo" : "Chưa tạo"}
                        </span>

                        {project.hasEvaluation && loadingPreviousEvaluations ? (
                          <span className="text-xs font-medium text-slate-400">
                            Đang tải đánh giá cũ...
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td className="p-6 text-center">
                      <button
                        onClick={() => onOpenProjectDetail(project.id)}
                        className="rounded-2xl border border-blue-200 px-4 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50"
                      >
                        Xem chi tiết
                      </button>
                    </td>

                    <td className="p-6">
                      <textarea
                        value={drafts[project.id] || ""}
                        onChange={(event) =>
                          onDraftChange(project.id, event.target.value)
                        }
                        rows={4}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder={
                          project.hasEvaluation
                            ? "Đang hiển thị nội dung đánh giá cũ, bạn có thể chỉnh sửa trực tiếp..."
                            : "Nhập nhận xét, góp ý hoặc đánh giá dành cho đồ án này..."
                        }
                      />
                    </td>

                    <td className="p-6 text-right">
                      <button
                        onClick={() => onSubmit(project)}
                        disabled={isSubmitting}
                        className={`rounded-2xl px-5 py-3 text-sm font-black text-white transition-all ${
                          project.hasEvaluation
                            ? "bg-amber-500 hover:bg-amber-600"
                            : "bg-slate-900 hover:bg-slate-800"
                        } disabled:cursor-wait disabled:opacity-70`}
                      >
                        {isSubmitting
                          ? "Đang lưu..."
                          : project.hasEvaluation
                            ? "Cập nhật"
                            : "Tạo đánh giá"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
