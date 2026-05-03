import React, { useState } from "react";
import {
  X,
  DollarSign,
  Code2,
  Image as ImageIcon,
  Info,
  ExternalLink,
} from "lucide-react";

export default function ProjectDetailModal({
  id,
  project,
  modalLoading,
  actionLoading,
  onClose,
  onApprove,
  readOnly = false,
}) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [error, setError] = useState("");

  if (!id) return null;

  const handleConfirmReject = () => {
    if (!adminNote.trim()) {
      setError("Vui lòng nhập lý do từ chối để sinh viên chỉnh sửa!");
      return;
    }
    onApprove(id, "REJECTED", adminNote);
  };

  const handleCloseModal = () => {
    setIsRejecting(false);
    setAdminNote("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all">
      <div className="flex max-h-[92vh] w-full max-w-6xl animate-in zoom-in flex-col overflow-hidden rounded-[40px] bg-white shadow-2xl duration-300 fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-10 py-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">
              {readOnly ? "Xem chi tiết đồ án" : "Chi tiết đồ án"}
            </h2>
            <div className="mt-1 flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                ID: #{id}
              </span>
              <div className="h-1 w-1 rounded-full bg-slate-300"></div>
              <span
                className={`rounded border px-2 py-0.5 text-[10px] font-black ${
                  project?.status === "APPROVED"
                    ? "border-emerald-500 text-emerald-500"
                    : project?.status === "REJECTED"
                      ? "border-rose-500 text-rose-500"
                      : "border-amber-500 text-amber-500"
                }`}
              >
                {project?.status || "PENDING"}
              </span>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 transition-all hover:bg-black hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-8 md:p-10">
          {modalLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-black">
                    <Info size={20} className="text-blue-600" /> Nội dung đề tài
                  </h3>
                  <h1 className="mb-4 text-2xl font-bold text-slate-900">
                    {project?.title}
                  </h1>
                  <p className="whitespace-pre-line leading-relaxed text-slate-600">
                    {project?.description || "Không có mô tả chi tiết."}
                  </p>

                  <div className="mt-8">
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                      <Code2 size={14} /> Công nghệ sử dụng
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.length > 0 ? (
                        project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700"
                          >
                            {tech.name || tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs italic text-slate-400">
                          Chưa cập nhật công nghệ
                        </span>
                      )}
                    </div>
                  </div>
                </section>

                <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 flex items-center gap-2 text-lg font-black">
                    <ImageIcon size={20} className="text-emerald-500" /> Hình
                    ảnh minh họa
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project?.images?.length > 0 ? (
                      project.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-video overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
                        >
                          <img
                            src={img.imageUrl || img}
                            alt="preview"
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm font-medium text-slate-400">
                        Sinh viên không tải ảnh minh họa
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 text-lg font-black">
                    Tài nguyên & Chi phí
                  </h3>
                  <div className="space-y-4">
                    {project?.source_code_url && (
                      <a
                        href={project.source_code_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                      >
                        <span className="text-sm font-bold">Source Code</span>
                        <ExternalLink
                          size={16}
                          className="text-slate-300 group-hover:text-black"
                        />
                      </a>
                    )}
                    {project?.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                      >
                        <span className="text-sm font-bold">Video Demo</span>
                        <ExternalLink
                          size={16}
                          className="text-slate-300 group-hover:text-black"
                        />
                      </a>
                    )}
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-8 text-center">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Hình thức bán
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign
                        size={24}
                        className={
                          project?.price_type === "PAID"
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                      <span className="text-3xl font-black">
                        {project?.price_type === "PAID"
                          ? `${project?.price_download?.toLocaleString() || 0}đ`
                          : "MIỄN PHÍ"}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="rounded-[32px] bg-zinc-900 p-8 text-white">
                  <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Thông tin tác giả
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-xl font-black">
                      {project?.student_name?.charAt(0) || "S"}
                    </div>
                    <div>
                      <p className="font-bold">
                        {project?.student_name || "Sinh viên ẩn danh"}
                      </p>
                      <p className="text-xs text-zinc-500">
                        MSSV: {project?.student_mssv || "N/A"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 bg-white px-10 py-8">
          {readOnly ? (
            <div className="flex items-center justify-between">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-300">
                    Lượt xem
                  </p>
                  <p className="text-xl font-black">{project?.view_count || 0}</p>
                </div>
                <div className="border-l border-slate-100 pl-8 text-center">
                  <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-300">
                    Lượt tải
                  </p>
                  <p className="text-xl font-black">
                    {project?.download_count || 0}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-2xl border border-slate-200 px-8 py-3 text-[11px] font-black uppercase tracking-widest text-slate-700 transition-all hover:bg-slate-50"
              >
                Đóng
              </button>
            </div>
          ) : isRejecting ? (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <label className="mb-3 block text-sm font-black text-slate-800">
                LÝ DO TỪ CHỐI <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => {
                  setAdminNote(e.target.value);
                  setError("");
                }}
                placeholder="Nhập lý do chi tiết để sinh viên chỉnh sửa..."
                className={`min-h-[100px] w-full rounded-2xl border-2 p-5 text-sm font-medium outline-none transition-all ${
                  error
                    ? "border-rose-400"
                    : "border-slate-100 focus:border-black"
                }`}
              />
              {error && (
                <p className="mt-2 text-xs font-bold text-rose-500">{error}</p>
              )}
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setIsRejecting(false)}
                  className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={actionLoading}
                  className="rounded-2xl bg-rose-500 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-rose-100"
                >
                  {actionLoading ? "Đang xử lý..." : "Xác nhận từ chối"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-300">
                    Lượt xem
                  </p>
                  <p className="text-xl font-black">{project?.view_count || 0}</p>
                </div>
                <div className="border-l border-slate-100 pl-8 text-center">
                  <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-300">
                    Lượt tải
                  </p>
                  <p className="text-xl font-black">
                    {project?.download_count || 0}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsRejecting(true)}
                  disabled={actionLoading}
                  className="rounded-2xl border-2 border-rose-500 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-rose-500 transition-all hover:bg-rose-50 disabled:opacity-30"
                >
                  Từ chối đồ án
                </button>
                <button
                  onClick={() => onApprove(id, "APPROVED", null)}
                  disabled={actionLoading}
                  className="rounded-2xl bg-emerald-500 px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-emerald-600 disabled:opacity-30"
                >
                  Duyệt đồ án này
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
