import React, { useEffect, useState } from "react";
import cvService from "../../services/cvService";
import CvTableRow from "./CvTableRow";
import CvDetailModal from "./CvDetailModal";
import Swal from "sweetalert2";
import { Filter } from "lucide-react";

export default function CvList() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCv, setSelectedCv] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  //Khởi tạo các state lưu trữ giá trị lọc ---
  const [filterName, setFilterName] = useState("");
  const [filterMssv, setFilterMssv] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  // -------------------------------------------------------------

  useEffect(() => {
    loadCvs();
  }, []);

  const loadCvs = async () => {
    setLoading(true);
    try {
      // --- PHẦN THÊM MỚI: Lấy giá trị lọc để truyền xuống service ---
      const queryParams = {};
      if (filterName.trim()) queryParams.studentName = filterName.trim();
      if (filterMssv.trim()) queryParams.mssv = filterMssv.trim();
      if (filterStatus) queryParams.status = filterStatus;

      // --- PHẦN SỬA: Truyền queryParams vào hàm getAllCvs ---
      const response = await cvService.getAllCvs(queryParams);

      const data = response.data ? response.data : [];
      setCvs(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- PHẦN THÊM MỚI: Hàm xử lý sự kiện khi bấm nút Lọc ---
  const handleFilter = (e) => {
    e.preventDefault(); // Chặn việc reload lại trang web
    loadCvs(); // Gọi lại hàm load API với tham số mới
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

  // const handleApprove = async (id, status, adminNote) => {
  //   setActionLoading(true);
  //   try {
  //     const res = await cvService.approveCv(id, status, adminNote);

  //     console.log(res.response);

  //     alert(
  //       `Hồ sơ đã được ${status === "APPROVED" ? "duyệt" : "từ chối"} thành công!`,
  //     );
  //     await loadCvs();
  //     if (selectedId === id) openDetails(id);
  //   } catch (err) {
  //     console.error("Lỗi duyệt CV:", err.data.response);
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };
  const handleApprove = async (id, status, adminNote) => {
    const action = status === "APPROVED" ? "Duyệt" : "Từ chối";
    setActionLoading(true);
    try {
      const res = await cvService.approveCv(id, status, adminNote);

      // Log data trả về từ server
      console.log("Response data:", res.data);

      await Swal.fire(
        "Thành công!",
        `Hồ sơ đã được ${action.toLowerCase()} thành công.`,
        "success",
      );

      await loadCvs();

      if (selectedId === id) openDetails(id);
    } catch (err) {
      console.error("Full error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
        console.error("Message:", err.response.data.message);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-black">
      <div className="mb-0 pb-6 border-b border-slate-100">
        <h1 className="text-4xl text-black font-semibold">Danh sách CV</h1>
        <p className="text-slate-400 mt-2 text-sm font-medium italic">
          Quản lý và kiểm duyệt hồ sơ ứng viên
        </p>
      </div>

      {/* --- PHẦN THÊM MỚI: Giao diện bộ lọc (Search Form) --- */}
      <form
        onSubmit={handleFilter}
        className="mb-0 flex flex-wrap gap-4 items-end bg-slate-50 p-5 rounded-[24px] border border-slate-100"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
            Tên sinh viên
          </label>
          <input
            type="text"
            placeholder="VD: Nguyễn Văn A..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-100 transition-all bg-white"
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
            MSSV
          </label>
          <input
            type="text"
            placeholder="Nhập MSSV..."
            value={filterMssv}
            onChange={(e) => setFilterMssv(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-100 transition-all bg-white"
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
            Trạng thái
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-100 transition-all bg-white"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="PENDING">Chờ duyệt</option>
            <option value="APPROVED">Đã duyệt</option>
            <option value="REJECTED">Từ chối</option>
          </select>
        </div>

        <button
          type="submit"
          className="h-[46px] px-8 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-md shadow-slate-200"
        >
          <Filter size={16} /> Lọc
        </button>
      </form>
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
