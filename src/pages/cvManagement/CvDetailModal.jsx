import React, { useState } from "react";
import AdminPreviewCv from "../../components/AdminPreviewCv";

export default function CvDetailModal({
  id,
  cv,
  modalLoading,
  actionLoading,
  onClose,
  onApprove,
}) {
  // Thêm các state để quản lý việc nhập lý do từ chối
  const [isRejecting, setIsRejecting] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [error, setError] = useState("");

  if (!id) return null;

  // Hàm xử lý khi bấm xác nhận từ chối
  const handleConfirmReject = () => {
    if (!adminNote.trim()) {
      setError("Vui lòng nhập lý do từ chối để sinh viên!");
      return;
    }
    onApprove(id, "REJECTED", adminNote);
  };

  // Hàm xử lý khi bấm hủy từ chối
  const handleCancelReject = () => {
    setIsRejecting(false);
    setAdminNote("");
    setError("");
  };

  // Hàm đóng modal (reset lại form)
  const handleCloseModal = () => {
    handleCancelReject();
    onClose();
  };

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
            onClick={handleCloseModal}
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
        <div className="px-10 py-8 bg-white border-t border-slate-100 flex flex-col">
          {isRejecting ? (
            /* ===== GIAO DIỆN KHI BẤM TỪ CHỐI (NHẬP LÝ DO) ===== */
            <div className="w-full flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300">
              <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                LÝ DO TỪ CHỐI <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => {
                  setAdminNote(e.target.value);
                  if (error) setError("");
                }}
                disabled={actionLoading}
                placeholder="Nhập lý do chi tiết tại sao CV này chưa đạt yêu cầu để sinh viên chỉnh sửa..."
                className={`w-full p-5 border-2 rounded-2xl outline-none transition-all min-h-[120px] resize-none text-sm font-medium ${
                  error
                    ? "border-rose-400 focus:ring-4 focus:ring-rose-100"
                    : "border-slate-200 focus:border-black focus:ring-4 focus:ring-slate-100"
                }`}
              />
              {error && (
                <p className="text-rose-500 text-xs font-bold tracking-wide">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-4 mt-2">
                <button
                  onClick={handleCancelReject}
                  disabled={actionLoading}
                  className="px-8 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-colors uppercase text-[11px] tracking-widest disabled:opacity-50"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={actionLoading}
                  className="px-10 py-4 rounded-2xl font-black bg-rose-500 text-white hover:bg-rose-600 transition-all uppercase text-[11px] tracking-widest shadow-xl shadow-rose-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {actionLoading ? "Đang xử lý..." : "Xác nhận từ chối"}
                </button>
              </div>
            </div>
          ) : (
            /* ===== GIAO DIỆN MẶC ĐỊNH (2 NÚT DUYỆT / TỪ CHỐI) ===== */
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
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
                  onClick={() => setIsRejecting(true)}
                  disabled={actionLoading}
                  className="flex-1 md:flex-none px-10 py-4 rounded-2xl font-black border-2 border-rose-500 text-rose-500 hover:bg-rose-50 transition-colors uppercase text-[11px] tracking-widest disabled:opacity-30"
                >
                  Từ chối hồ sơ
                </button>
                <button
                  // Bấm duyệt thì adminNote là rỗng/null
                  onClick={() => onApprove(id, "APPROVED", null)}
                  disabled={actionLoading}
                  className="flex-1 md:flex-none px-12 py-4 rounded-2xl font-black border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 transition-colors uppercase text-[11px] tracking-widest shadow-xl shadow-emerald-50 disabled:opacity-30"
                >
                  Duyệt hồ sơ này
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
