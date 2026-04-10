import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  User,
  Inbox,
} from "lucide-react";
import Swal from "sweetalert2";
import cvService from "../../services/cvService";
import CvDetailModal from "../cvManagement/CvDetailModal";
export default function ListRequestEdit() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== STATE CHO MODAL XEM CV =====
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [selectedCvData, setSelectedCvData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Load danh sách ticket
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await cvService.getPendingUnlockRequests(0, 10);
      if (res.code === 200 && res.data) {
        setRequests(res.data.content || res.data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ===== HÀM MỞ MODAL XEM CHI TIẾT CV =====
  const handleViewCv = async (cvId) => {
    setSelectedCvId(cvId);
    setSelectedCvData(null);
    setModalLoading(true);
    try {
      const response = await cvService.getCvById(cvId);
      const data = response.data || response;
      if (data.content_json && typeof data.content_json === "string") {
        data.content_json = JSON.parse(data.content_json);
      }
      setSelectedCvData(data);
    } catch (err) {
      console.error("Lỗi lấy chi tiết CV:", err);
      Swal.fire("Lỗi!", "Không thể tải dữ liệu CV này.", "error");
    } finally {
      setModalLoading(false);
    }
  };

  // Hàm xử lý Duyệt
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận duyệt?",
      text: "Sinh viên sẽ được phép chỉnh sửa CV này.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Đồng ý duyệt",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await cvService.approveUnlockRequest(id, true, "");
        Swal.fire("Thành công!", "Đã mở khóa CV cho sinh viên.", "success");
        fetchRequests();
      } catch (error) {
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi duyệt.", "error");
      }
    }
  };

  // Hàm xử lý Từ chối
  const handleReject = async (id) => {
    const { value: adminNote } = await Swal.fire({
      title: "Từ chối yêu cầu",
      input: "textarea",
      inputLabel: "Nhập lý do từ chối (bắt buộc):",
      inputPlaceholder: "Ví dụ: Yêu cầu không hợp lý...",
      inputAttributes: {
        "aria-label": "Lý do từ chối",
      },
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Từ chối",
      cancelButtonText: "Hủy",
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return "Bạn phải nhập lý do từ chối!";
        }
      },
    });

    if (adminNote) {
      try {
        await cvService.approveUnlockRequest(id, false, adminNote.trim());
        Swal.fire(
          "Đã từ chối!",
          "Đã gửi thông báo từ chối cho sinh viên.",
          "success",
        );
        fetchRequests();
      } catch (error) {
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi từ chối.", "error");
      }
    }
  };

  return (
    <div className="p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Yêu Cầu Mở Khóa CV
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Quản lý và phê duyệt các yêu cầu chỉnh sửa CV từ sinh viên.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                  <th className="p-5 font-bold">Sinh viên</th>
                  <th className="p-5 font-bold">Thông tin CV</th>
                  <th className="p-5 font-bold w-[30%]">Lý do xin sửa</th>
                  <th className="p-5 font-bold text-center">Thời gian</th>
                  <th className="p-5 font-bold text-right pr-8">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
                        <p className="font-medium text-sm">
                          Đang tải dữ liệu...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Inbox size={48} className="text-slate-300 mb-4" />
                        <p className="font-medium text-lg text-slate-600">
                          Tuyệt vời!
                        </p>
                        <p className="text-sm mt-1">
                          Hiện không có yêu cầu nào đang chờ xử lý.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      {/* Cột Sinh viên */}
                      <td className="p-5 align-middle">
                        <div className="flex items-center gap-4">
                          <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600 shadow-sm border border-indigo-200/50">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-base">
                              {req.studentName}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                              MSSV:{" "}
                              <span className="text-slate-600">{req.mssv}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Cột CV */}
                      <td className="p-5 align-middle">
                        <div className="flex items-center gap-4">
                          <div className="bg-sky-100 p-2.5 rounded-xl text-sky-600 shadow-sm border border-sky-200/50">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1">
                              {req.cvTitle}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                              ID:{" "}
                              <span className="text-slate-600">
                                #{req.cvId}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Cột Lý do */}
                      <td className="p-5 align-middle">
                        <div className="bg-amber-50/80 px-4 py-3 rounded-xl border border-amber-200/60 shadow-sm">
                          <p className="text-sm text-amber-900 italic font-medium leading-relaxed line-clamp-2">
                            "{req.reason}"
                          </p>
                        </div>
                      </td>

                      {/* Cột Thời gian */}
                      <td className="p-5 align-middle text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium text-sm border border-slate-200">
                          <Clock size={16} />
                          <span>
                            {new Date(req.requestedAt).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Cột Action */}
                      <td className="p-5 align-middle pr-8">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* 1. NÚT XEM CV */}
                          <button
                            onClick={() => handleViewCv(req.cvId)}
                            title="Xem chi tiết CV"
                            className="flex items-center justify-center p-2.5 bg-white text-sky-600 hover:bg-sky-50 hover:text-sky-700 rounded-xl transition-all border border-slate-200 hover:border-sky-300 shadow-sm"
                          >
                            <Eye size={18} />
                          </button>

                          {/* 2. NÚT DUYỆT TICKET */}
                          <button
                            onClick={() => handleApprove(req.id)}
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white rounded-xl transition-all font-bold text-sm border border-emerald-200 hover:border-emerald-500 shadow-sm"
                          >
                            <CheckCircle size={18} /> Duyệt
                          </button>

                          {/* 3. NÚT TỪ CHỐI TICKET */}
                          <button
                            onClick={() => handleReject(req.id)}
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-500 hover:text-white rounded-xl transition-all font-bold text-sm border border-rose-200 hover:border-rose-500 shadow-sm"
                          >
                            <XCircle size={18} /> Từ chối
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
      </div>

      {/* MODAL XEM CHI TIẾT CV */}
      <CvDetailModal
        id={selectedCvId}
        cv={selectedCvData}
        modalLoading={modalLoading}
        onClose={() => setSelectedCvId(null)}
        hideActions={true}
      />
    </div>
  );
}
