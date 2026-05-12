import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  BuildingOffice2Icon,
  FolderOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import projectAccessRequestService from "../../services/projectAccessRequestService";
import Pagination from "../../components/Pagination";

export default function ProjectAccessRequestList() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [reviewData, setReviewData] = useState({
    status: "APPROVED",
    approval_note: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchRequests = async (currentPage = page) => {
    try {
      setLoading(true);

      const response =
        await projectAccessRequestService.getProjectAccessRequests(
          currentPage,
          size,
        );

      const pageData = response?.data;

      setRequests(pageData?.content || []);
      setTotalPages(pageData?.totalPages || 0);
    } catch (error) {
      console.error("Lỗi lấy danh sách request:", error);
      window.alert("Không thể tải danh sách yêu cầu hợp tác project.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(page);
  }, [page]);

  const handleOpenDetail = async (id) => {
    try {
      const response =
        await projectAccessRequestService.getProjectAccessRequestDetail(id);

      if (response?.data) {
        setSelectedRequest(response.data);
        setReviewData({
          status:
            response.data.status === "PENDING"
              ? "APPROVED"
              : response.data.status || "APPROVED",
          approval_note: response.data.approval_note || "",
        });
      }
    } catch (error) {
      console.error("Lỗi lấy chi tiết request:", error);
      window.alert("Không thể tải chi tiết yêu cầu.");
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setReviewData({
      status: "APPROVED",
      approval_note: "",
    });
  };

  const handleSubmitReview = async () => {
    if (!selectedRequest?.id) return;

    try {
      setSubmitLoading(true);

      const response =
        await projectAccessRequestService.updateProjectAccessRequestStatus(
          selectedRequest.id,
          {
            status: reviewData.status,
            approval_note: reviewData.approval_note,
          },
        );

      window.alert(response?.message || "Đã cập nhật trạng thái yêu cầu.");
      handleCloseModal();
      fetchRequests(page);
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái request:", error);
      console.error("Response data:", error?.response?.data);

      window.alert(
        error?.response?.data?.message ||
          "Không thể cập nhật trạng thái yêu cầu.",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "---";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "---";

    return date.toLocaleString("vi-VN");
  };

  const getStatusClass = (status) => {
    if (status === "PENDING") {
      return "bg-amber-100 text-amber-700";
    }

    if (status === "APPROVED") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "REJECTED") {
      return "bg-rose-100 text-rose-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  const isProcessed =
    selectedRequest?.status === "APPROVED" ||
    selectedRequest?.status === "REJECTED";

  return (
    <>
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Chi tiết yêu cầu hợp tác
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Xem và xử lý yêu cầu hợp tác project từ doanh nghiệp.
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-full p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <BuildingOffice2Icon className="h-5 w-5 text-blue-600" />
                  Thông tin công ty
                </h3>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Tên công ty:
                    </span>{" "}
                    <span className="text-slate-600">
                      {selectedRequest.company_name}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 text-slate-600">
                    <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                    {selectedRequest.company_email || "---"}
                  </p>

                  <p className="flex items-center gap-2 text-slate-600">
                    <PhoneIcon className="h-4 w-4 text-slate-400" />
                    {selectedRequest.company_phone || "---"}
                  </p>

                  <p className="flex items-center gap-2 text-slate-600">
                    <GlobeAltIcon className="h-4 w-4 text-slate-400" />
                    {selectedRequest.company_website || "---"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <FolderOpenIcon className="h-5 w-5 text-blue-600" />
                  Thông tin project
                </h3>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Project:
                    </span>{" "}
                    <span className="text-slate-600">
                      {selectedRequest.project_title}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Sinh viên:
                    </span>{" "}
                    <span className="text-slate-600">
                      {selectedRequest.student_name}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Trạng thái:
                    </span>{" "}
                    <span
                      className={`ml-2 rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                        selectedRequest.status,
                      )}`}
                    >
                      {selectedRequest.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                Lý do gửi yêu cầu
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {selectedRequest.reason || "Không có nội dung."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 text-base font-bold text-slate-900">
                  Thời gian
                </h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Gửi lúc:
                    </span>{" "}
                    {formatDateTime(selectedRequest.requested_at)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">
                      Xử lý lúc:
                    </span>{" "}
                    {formatDateTime(selectedRequest.processed_at)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 text-base font-bold text-slate-900">
                  Ghi chú hiện tại
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {selectedRequest.approval_note || "Chưa có ghi chú."}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Xử lý yêu cầu
              </h3>

              {isProcessed ? (
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  Yêu cầu này đã được xử lý và hiện không thể cập nhật thêm. Bạn
                  chỉ có thể xem thông tin chi tiết.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Trạng thái mới
                      </label>
                      <select
                        value={reviewData.status}
                        onChange={(e) =>
                          setReviewData((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                      >
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Ghi chú phản hồi
                      </label>
                      <textarea
                        rows="4"
                        value={reviewData.approval_note}
                        onChange={(e) =>
                          setReviewData((prev) => ({
                            ...prev,
                            approval_note: e.target.value,
                          }))
                        }
                        placeholder="Nhập ghi chú duyệt hoặc từ chối..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={handleCloseModal}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-white"
                    >
                      Hủy
                    </button>

                    <button
                      onClick={handleSubmitReview}
                      disabled={submitLoading}
                      className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitLoading ? "Đang xử lý..." : "Cập nhật trạng thái"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-50 px-6 pb-12 pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Project Access Requests
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Quản lý các yêu cầu hợp tác hoặc truy cập project từ doanh nghiệp.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Công ty
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Project
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Sinh viên
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Ngày gửi
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : requests.length > 0 ? (
                  requests.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        #{item.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {item.company_name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.company_email}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {item.project_title}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {item.student_name}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDateTime(item.requested_at)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenDetail(item.id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100"
                        >
                          <EyeIcon className="h-4 w-4" />
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      Chưa có yêu cầu hợp tác project nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={page + 1}
                totalPages={totalPages}
                setCurrentPage={(newPage) => setPage(newPage - 1)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
