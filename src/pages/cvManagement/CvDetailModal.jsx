import React from "react";
import AdminPreviewCv from "../../components/AdminPreviewCv";

export default function CvDetailModal({
  id,
  cv,
  modalLoading,
  actionLoading,
  onClose,
  onApprove,
}) {
  if (!id) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-6xl max-h-[95vh] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header Modal */}
        <div className="px-10 py-7 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              Chi tiết hồ sơ
            </h2>
            <div className="flex gap-4 mt-1.5 items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                ID: #{id}
              </span>
              <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
              <span className="text-[10px] font-bold text-black uppercase border border-black px-2 py-0.5 rounded leading-none">
                LOẠI: {cv?.type}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full hover:bg-black hover:text-white transition-all text-xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Content Area - Nơi hiển thị Preview */}
        <div className="flex-1 overflow-y-auto bg-slate-50/40 p-6 md:p-12 scrollbar-hide">
          {modalLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-10 h-10 border-2 border-slate-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : cv?.type === "FORM" ? (
            <div className="shadow-2xl shadow-slate-200 rounded-3xl overflow-hidden bg-white border border-slate-100 mb-10">
              <AdminPreviewCv data={cv.content_json} />
            </div>
          ) : (
            <div className="bg-white p-20 rounded-[40px] text-center shadow-xl max-w-2xl mx-auto border border-slate-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-50 text-black rounded-[32px] flex items-center justify-center mb-8 text-3xl font-black border border-slate-100">
                PDF
              </div>
              <h3 className="text-2xl font-black text-black mb-3">
                {cv?.cv_file?.file_name}
              </h3>
              <p className="text-slate-400 mb-10 italic font-medium text-sm">
                Hồ sơ được gửi dưới dạng tệp đính kèm (PDF).
              </p>
              <a
                href={cv?.cv_file?.file_path}
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-12 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all uppercase text-xs tracking-widest shadow-xl shadow-slate-200"
              >
                Mở tài liệu PDF
              </a>
            </div>
          )}
        </div>

        {/* Footer Modal: Hành động duyệt */}
        <div className="px-10 py-8 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-[9px] uppercase font-black text-slate-300 tracking-widest mb-1">
                Lượt xem
              </p>
              <p className="text-2xl font-black tabular-nums">
                {cv?.view_count || 0}
              </p>
            </div>
            <div className="text-center border-l pl-10 border-slate-100">
              <p className="text-[9px] uppercase font-black text-slate-300 tracking-widest mb-1">
                Lượt tải
              </p>
              <p className="text-2xl font-black tabular-nums">
                {cv?.download_count || 0}
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => onApprove(id, "REJECTED")}
              disabled={actionLoading}
              className="flex-1 md:flex-none px-10 py-4 rounded-2xl font-black border-2 border-rose-500 text-rose-500 hover:bg-rose-50 transition-colors uppercase text-[11px] tracking-widest disabled:opacity-30"
            >
              Từ chối hồ sơ
            </button>
            <button
              onClick={() => onApprove(id, "APPROVED")}
              disabled={actionLoading}
              className="flex-1 md:flex-none px-12 py-4 rounded-2xl font-black border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 transition-colors uppercase text-[11px] tracking-widest shadow-xl shadow-emerald-50 disabled:opacity-30"
            >
              Duyệt hồ sơ này
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
