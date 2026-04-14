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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="w-full max-w-6xl max-h-[92vh] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header Modal */}
        <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              Chi tiết đồ án
            </h2>
            <div className="flex gap-4 mt-1 items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                ID: #{id}
              </span>
              <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded border ${
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
            className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full hover:bg-black hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-8 md:p-10">
          {modalLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <Info size={20} className="text-blue-600" /> Nội dung đề tài
                  </h3>
                  <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    {project?.title}
                  </h1>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {project?.description || "Không có mô tả chi tiết."}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Code2 size={14} /> Công nghệ sử dụng
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.length > 0 ? (
                        project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700"
                          >
                            {tech.name || tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-xs">
                          Chưa cập nhật công nghệ
                        </span>
                      )}
                    </div>
                  </div>
                </section>

                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <ImageIcon size={20} className="text-emerald-500" /> Hình
                    ảnh minh họa
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project?.images?.length > 0 ? (
                      project.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                        >
                          <img
                            src={img.imageUrl || img}
                            alt="preview"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium">
                        Sinh viên không tải ảnh minh họa
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black mb-6">
                    Tài nguyên & Chi phí
                  </h3>
                  <div className="space-y-4">
                    {project?.source_code_url && (
                      <a
                        href={project.source_code_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
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
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
                      >
                        <span className="text-sm font-bold">Video Demo</span>
                        <ExternalLink
                          size={16}
                          className="text-slate-300 group-hover:text-black"
                        />
                      </a>
                    )}
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
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

                <section className="bg-zinc-900 p-8 rounded-[32px] text-white">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">
                    Thông tin tác giả
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center font-black text-xl">
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

        {/* Footer Modal: Hành động duyệt */}
        <div className="px-10 py-8 bg-white border-t border-slate-100">
          {isRejecting ? (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <label className="text-sm font-black text-slate-800 mb-3 block">
                LÝ DO TỪ CHỐI <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => {
                  setAdminNote(e.target.value);
                  setError("");
                }}
                placeholder="Nhập lý do chi tiết để sinh viên chỉnh sửa..."
                className={`w-full p-5 border-2 rounded-2xl outline-none min-h-[100px] text-sm font-medium transition-all ${
                  error
                    ? "border-rose-400"
                    : "border-slate-100 focus:border-black"
                }`}
              />
              {error && (
                <p className="text-rose-500 text-xs font-bold mt-2">{error}</p>
              )}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsRejecting(false)}
                  className="px-8 py-4 font-black text-slate-400 uppercase text-[11px] tracking-widest"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={actionLoading}
                  className="px-10 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-rose-100"
                >
                  {actionLoading ? "Đang xử lý..." : "Xác nhận từ chối"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Lượt xem
                  </p>
                  <p className="text-xl font-black">
                    {project?.view_count || 0}
                  </p>
                </div>
                <div className="text-center border-l pl-8 border-slate-100">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
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
                  className="px-10 py-4 rounded-2xl font-black border-2 border-rose-500 text-rose-500 hover:bg-rose-50 transition-all uppercase text-[11px] tracking-widest disabled:opacity-30"
                >
                  Từ chối đồ án
                </button>
                <button
                  onClick={() => onApprove(id, "APPROVED", null)}
                  disabled={actionLoading}
                  className="px-12 py-4 rounded-2xl font-black bg-emerald-500 text-white hover:bg-emerald-600 transition-all uppercase text-[11px] tracking-widest shadow-xl shadow-emerald-100 disabled:opacity-30"
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
