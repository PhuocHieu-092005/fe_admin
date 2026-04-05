import React, { useEffect, useState } from "react";
import cvService from "../../services/cvService";
import CvTableRow from "./CvTableRow";
import CvDetailModal from "./CvDetailModal";
export default function CvList() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCv, setSelectedCv] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadCvs();
  }, []);

  const loadCvs = async () => {
    setLoading(true);
    try {
      const response = await cvService.getAllCvs();
      const data = Array.isArray(response) ? response : [];
      setCvs(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (id) => {
    setSelectedId(id);
    setSelectedCv(null);
    setModalLoading(true);
    try {
      const response = await cvService.getCvById(id);
      const data = response.data || response;
      if (data.content_json && typeof data.content_json === "string") {
        data.content_json = JSON.parse(data.content_json);
      }
      setSelectedCv(data);
    } catch (err) {
      console.error("Lỗi lấy chi tiết:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleApprove = async (id, status) => {
    setActionLoading(true);
    try {
      await cvService.approveCv(id, status);
      await loadCvs();
      if (selectedId === id) openDetails(id);
    } catch (err) {
      console.error("Lỗi duyệt CV:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-black">
      <div className="mb-12 pb-6 border-b border-slate-100">
        <h1 className="text-4xl text-black font-semibold">Danh sách CV</h1>
        <p className="text-slate-400 mt-2 text-sm font-medium italic">
          Quản lý và kiểm duyệt hồ sơ ứng viên
        </p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-base font-black">Mã số</th>
                <th className="p-6 text-base font-black">Hồ sơ sinh viên</th>
                <th className="p-6 text-base font-black text-center">
                  Hình thức
                </th>
                <th className="p-6 text-base font-black text-center">
                  Trạng thái
                </th>
                <th className="p-6 text-base font-black text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <div className="inline-block w-8 h-8 border-2 border-slate-200 border-t-black rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-300 font-bold uppercase text-[9px] tracking-[0.2em]">
                      Đang đồng bộ...
                    </p>
                  </td>
                </tr>
              ) : (
                cvs.map((cv) => (
                  <CvTableRow key={cv.id} cv={cv} onOpenDetails={openDetails} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CvDetailModal
        id={selectedId}
        cv={selectedCv}
        modalLoading={modalLoading}
        actionLoading={actionLoading}
        onClose={() => setSelectedId(null)}
        onApprove={handleApprove}
      />
    </div>
  );
}
