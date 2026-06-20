import React, { useEffect, useState } from "react";
import projectService from "../../services/projectService";
import Swal from "sweetalert2";
import ProjectDetailModal from "./ProjectDetailModal";
import Pagination from "../../components/Pagination";

import { Filter } from "lucide-react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [filterMssv, setFilterMssv] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 5,
  });

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  const loadData = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page: page - 1,
        size: pageInfo.size,
      };

      if (filterName.trim()) params.studentName = filterName.trim();
      if (filterMssv.trim()) params.mssv = filterMssv.trim();
      if (filterStatus) params.status = filterStatus;

      const res = await projectService.getAdminProjects(params);

      const pageData = res?.data || {};
      const content = pageData?.content || [];

      setProjects(Array.isArray(content) ? content : []);
      setPageInfo({
        totalElements: pageData?.totalElements || 0,
        totalPages: pageData?.totalPages || 0,
        number: pageData?.number || 0,
        size: pageData?.size || 5,
      });
    } catch (err) {
      console.error("Lỗi khi load data Admin:", err);
      setProjects([]);
      setPageInfo({
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadData(1);
  };

  const openDetails = async (id) => {
    setSelectedId(id);
    setSelectedProject(null);
    setModalLoading(true);
    try {
      const res = await projectService.getProjectById(id);
      const data = res?.data || res;
      setSelectedProject(data);
    } catch (err) {
      console.error("Lỗi lấy chi tiết đồ án:", err);
      Swal.fire("Lỗi", "Không lấy được thông tin chi tiết đồ án!", "error");
    } finally {
      setModalLoading(false);
    }
  };

  const handleStatus = async (id, status, adminNote = null) => {
    const action = status === "APPROVED" ? "Duyệt" : "Từ chối";
    setActionLoading(true);

    try {
      await projectService.updateProjectStatus(id, status, adminNote);

      await Swal.fire(
        "Thành công!",
        `Đồ án đã được ${action.toLowerCase()} thành công.`,
        "success",
      );

      await loadData(currentPage);

      if (
        selectedId === id &&
        (status === "APPROVED" || status === "REJECTED")
      ) {
        const res = await projectService.getProjectById(id);
        const data = res?.data || res;
        setSelectedProject(data);
      }
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      Swal.fire("Lỗi", "Không thể cập nhật trạng thái đồ án!", "error");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="h-full bg-white p-8 pb-24 font-sans text-left text-black">
      <div className="mb-2 border-b border-slate-100 pb-6">
        <h1 className="text-4xl font-semibold text-black">Phê duyệt đồ án</h1>
        <p className="mt-2 text-sm font-medium italic text-slate-400">
          Quản lý và kiểm soát chất lượng nội dung đồ án sinh viên đăng tải
        </p>
      </div>

      <form
        onSubmit={handleFilter}
        className="mb-2 flex flex-wrap gap-4 items-end bg-slate-50 p-5 rounded-[24px] border border-slate-100"
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
            <option value="CLOSE">Đã đóng</option>
          </select>
        </div>

        <button
          type="submit"
          className="h-[46px] px-8 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-md shadow-slate-200"
        >
          <Filter size={16} /> Lọc
        </button>
      </form>

      <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Danh sách đồ án
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Tổng cộng {pageInfo.totalElements} đồ án
            </p>
          </div>

          <div className="text-sm text-slate-500">
            Trang {pageInfo.number + 1} / {pageInfo.totalPages || 1}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-6 text-base font-black">Mã số</th>
                <th className="p-6 text-base font-black w-1/3">
                  Tên đồ án / Sinh viên
                </th>
                <th className="p-6 text-center text-base font-black">
                  Hình thức
                </th>
                <th className="p-6 text-center text-base font-black">
                  Trạng thái
                </th>
                <th className="p-6 text-right text-base font-black">
                  Hành động
                </th>
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
              ) : projects.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center text-sm font-medium text-slate-400"
                  >
                    Chưa có đồ án nào trong trang này.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr
                    key={p.id}
                    className="group transition-colors hover:bg-slate-50/50"
                  >
                    <td className="p-6 font-mono text-sm text-slate-500">
                      #{p.id}
                    </td>
                    <td className="p-6">
                      <p className="text-sm">
                        <span className="font-mono font-semibold text-slate-600">
                          {p.student_mssv}
                        </span>

                        <span className="ml-2 font-semibold italic text-blue-600">
                          {p.student_name}
                        </span>
                      </p>

                      <p
                        className="mt-1 font-bold text-black line-clamp-2"
                        title={p.title}
                      >
                        {p.title}
                      </p>
                    </td>
                    <td className="p-6 text-center">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-[10px] font-black uppercase text-slate-500 whitespace-nowrap">
                        {p.price_type === "PAID" ? "BÁN CODE" : "MIỄN PHÍ"}
                      </span>
                    </td>

                    <td className="p-6 text-center">
                      <span
                        className={`inline-block min-w-[100px] rounded-full border-2 px-4 py-1 text-[10px] font-black uppercase tracking-tighter whitespace-nowrap ${
                          p.status === "APPROVED"
                            ? "border-emerald-500 text-emerald-600"
                            : p.status === "REJECTED"
                              ? "border-rose-500 text-rose-600"
                              : p.status === "CLOSE"
                                ? "border-slate-400 text-slate-500"
                                : "border-amber-500 text-amber-600"
                        }`}
                      >
                        {p.status === "APPROVED"
                          ? "Đã duyệt"
                          : p.status === "REJECTED"
                            ? "Từ chối"
                            : p.status === "CLOSE"
                              ? "Đã đóng"
                              : "Chờ duyệt"}
                      </span>
                    </td>

                    <td className="p-6 text-right">
                      <button
                        onClick={() => openDetails(p.id)}
                        className="rounded-xl bg-black px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95 whitespace-nowrap"
                      >
                        Kiểm duyệt
                      </button>
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

      <ProjectDetailModal
        id={selectedId}
        project={selectedProject}
        modalLoading={modalLoading}
        actionLoading={actionLoading}
        onClose={() => setSelectedId(null)}
        onApprove={handleStatus}
      />
    </div>
  );
}
