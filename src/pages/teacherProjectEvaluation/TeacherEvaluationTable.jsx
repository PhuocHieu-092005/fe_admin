import React, { useState } from "react";
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
  const [editingProject, setEditingProject] = useState(null);

  const getDraftText = (projectId) => drafts[projectId]?.trim() || "";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3">
        <h2 className="text-base font-black text-slate-900">
          Danh sách đồ án cần đánh giá
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Giảng viên có thể xem chi tiết đồ án trước và tạo nhận xét đánh giá
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="px-5 py-4 text-sm font-black">Đồ án</th>
              <th className="px-5 py-4 text-sm font-black">Sinh viên</th>
              <th className="px-5 py-4 text-sm font-black">Học phần</th>
              <th className="px-5 py-4 text-center text-sm font-black">
                Trạng thái
              </th>
              <th className="px-5 py-4 text-center text-sm font-black">
                Đánh giá
              </th>
              <th className="px-5 py-4 text-center text-sm font-black">
                Chi tiết
              </th>
              <th className="px-5 py-4 text-sm font-black">Nhận xét</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-5 py-10 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Đang tải dữ liệu...
                  </p>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-10 text-center text-sm font-medium text-slate-400"
                >
                  Chưa có đồ án nào thuộc phạm vi giảng viên phụ trách để đánh
                  giá.
                </td>
              </tr>
            ) : (
              projects.map((project) => {
                const projectStatus = getProjectStatusMeta(project.status);
                const draftText = getDraftText(project.id);

                return (
                  <tr
                    key={project.id}
                    className="align-middle transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-bold leading-5 text-slate-900">
                        {project.projectTitle}
                      </p>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        #{project.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {project.studentName}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {project.courseName}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${projectStatus.className}`}
                      >
                        {projectStatus.label}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
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

                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => onOpenProjectDetail(project.id)}
                        className="rounded-xl border border-blue-200 px-3 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50"
                      >
                        Xem chi tiết
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="max-w-[320px]">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                          <p className="max-h-[42px] overflow-hidden text-sm leading-5 text-slate-600">
                            {draftText || "Chưa có nhận xét"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setEditingProject(project)}
                          className="mt-2 rounded-xl border border-blue-200 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                        >
                          {draftText ? "Sửa nhận xét" : "Viết nhận xét"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-black text-slate-900">
                Nhận xét đồ án
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {editingProject.projectTitle}
              </p>
            </div>

            <textarea
              value={drafts[editingProject.id] || ""}
              onChange={(event) =>
                onDraftChange(editingProject.id, event.target.value)
              }
              rows={8}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder={
                editingProject.hasEvaluation
                  ? "Chỉnh sửa nội dung đánh giá cũ..."
                  : "Nhập nhận xét, góp ý hoặc đánh giá dành cho đồ án này..."
              }
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Hủy
              </button>

              <button
                type="button"
                disabled={submittingId === editingProject.id}
                onClick={async () => {
                  await onSubmit(editingProject);
                  setEditingProject(null);
                }}
                className={`rounded-xl px-5 py-2.5 text-sm font-black text-white transition ${
                  editingProject.hasEvaluation
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-slate-900 hover:bg-slate-800"
                } disabled:cursor-wait disabled:opacity-70`}
              >
                {submittingId === editingProject.id
                  ? "Đang lưu..."
                  : editingProject.hasEvaluation
                    ? "Cập nhật"
                    : "Tạo đánh giá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
