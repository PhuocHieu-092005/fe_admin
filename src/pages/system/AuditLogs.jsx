import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 10;

const formatDateTime = (value) => {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
};

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: PAGE_SIZE,
  });

  useEffect(() => {
    loadLogs(currentPage);
  }, [currentPage]);

  const loadLogs = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const response = await adminService.getAdminLogs({
        page: page - 1,
        size: PAGE_SIZE,
      });

      const pageData = response?.data || {};
      const content = Array.isArray(pageData?.content) ? pageData.content : [];

      setLogs(content);
      setPageInfo({
        totalElements: pageData?.totalElements || 0,
        totalPages: pageData?.totalPages || 0,
        number: pageData?.number || 0,
        size: pageData?.size || PAGE_SIZE,
      });
    } catch (err) {
      console.error("Lỗi khi tải danh sách log:", err);
      setLogs([]);
      setPageInfo({
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: PAGE_SIZE,
      });
      setError("Không thể tải danh sách log. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-white p-8 pb-24 text-left text-black">
      <div className="mb-12 border-b border-slate-100 pb-6">
        <h1 className="text-4xl font-semibold text-black">Audit Logs</h1>
        <p className="mt-2 text-sm font-medium italic text-slate-400">
          Theo dõi lịch sử thao tác của quản trị viên trong hệ thống
        </p>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Danh sách hoạt động
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Tổng cộng {pageInfo.totalElements} bản ghi
            </p>
          </div>

          <div className="text-sm text-slate-500">
            Trang {pageInfo.number + 1} / {pageInfo.totalPages || 1}
          </div>
        </div>

        {error ? (
          <div className="border-b border-rose-100 bg-rose-50 px-6 py-4 text-sm font-medium text-rose-600">
            {error}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-6 text-base font-black">Log ID</th>
                <th className="p-6 text-base font-black">Người thao tác</th>
                <th className="p-6 text-base font-black">Đối tượng</th>
                <th className="p-6 text-base font-black">Nội dung</th>
                <th className="p-6 text-base font-black">Thời gian</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                    <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
                      Đang đồng bộ...
                    </p>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center text-sm font-medium text-slate-400"
                  >
                    Chưa có log nào để hiển thị.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="group transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-6 font-mono text-sm text-slate-500">
                      #{log.id}
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-black">
                        {log.userName || "Không xác định"}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        User ID: {log.userId ?? "--"}
                      </p>
                    </td>
                    <td className="p-6">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                        Target ID: {log.targetId ?? "--"}
                      </span>
                    </td>
                    <td className="p-6">
                      <p className="font-medium text-slate-700">
                        {log.description || "--"}
                      </p>
                    </td>
                    <td className="p-6 text-sm text-slate-500">
                      {formatDateTime(log.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 pb-10">
        {!loading && pageInfo.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pageInfo.totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
