import React, { useEffect, useState } from "react";
import projectService from "../../services/projectService";
import { CheckCircle, XCircle, Eye, Search, Filter } from "lucide-react";
import Swal from "sweetalert2";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await projectService.getAdminProjects();

      // LOG ĐỂ KIỂM TRA: Sếp mở F12 xem cái mảng nó nằm ở đâu nhé
      console.log("Dữ liệu Admin nhận được từ API:", res);

      // BÓC TÁCH DỮ LIỆU:
      // res.data là body của ApiResponse.
      // Nếu có phân trang, mảng nằm trong res.data.content
      // Nếu không phân trang, mảng nằm trực tiếp trong res.data
      const actualData = res?.data?.content || res?.data || [];

      setProjects(Array.isArray(actualData) ? actualData : []);
    } catch (err) {
      console.error("Lỗi khi load data Admin:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    const action = status === "APPROVED" ? "Duyệt" : "Từ chối";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Đồ án này sẽ được chuyển sang trạng thái ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "APPROVED" ? "#10b981" : "#ef4444",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await projectService.updateProjectStatus(id, status);
        Swal.fire("Thành công!", `Đã ${action} đồ án thành công.`, "success");
        loadData(); // Load lại danh sách sau khi duyệt
      } catch (err) {
        Swal.fire(
          "Lỗi",
          "Không thể cập nhật trạng thái, check lại Backend nhen!",
          "error",
        );
      }
    }
  };

  return (
    <div className="p-8 text-left">
      <div className="flex justify-between items-center mb-10 text-left">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Phê duyệt đồ án
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Quản lý và kiểm soát chất lượng nội dung sinh viên đăng tải.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative text-left">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              placeholder="Tìm tên đồ án..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none w-64 focus:ring-2 ring-blue-500/20"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden text-left">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[11px] font-black uppercase text-slate-400 tracking-widest text-left">
              <th className="px-8 py-5 text-left">Tên đồ án / Sinh viên</th>
              <th className="px-6 py-5 text-left">Hình thức</th>
              <th className="px-6 py-5 text-center">Trạng thái</th>
              <th className="px-8 py-5 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-left">
            {projects?.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5 text-left">
                  <div className="font-bold text-slate-800">{p.title}</div>
                  <div className="text-xs text-blue-600 font-semibold italic">
                    {p.studentName || "Đang cập nhật..."}
                  </div>
                </td>
                <td className="px-6 py-5 text-left">
                  <span
                    className={`text-xs font-bold ${p.priceType === "PAID" ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    {p.priceType === "PAID"
                      ? `${p.priceDownload?.toLocaleString()}đ`
                      : "Miễn phí"}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black border shadow-sm ${
                      p.status === "PENDING"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : p.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}
                  >
                    {p.status || "NEW"}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 text-left">
                    <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                    {/* Chỉ hiện nút duyệt nếu đồ án chưa được duyệt hoặc từ chối */}
                    {p.status !== "APPROVED" && p.status !== "REJECTED" && (
                      <>
                        <button
                          onClick={() => handleStatus(p.id, "APPROVED")}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 bg-slate-50 rounded-lg"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleStatus(p.id, "REJECTED")}
                          className="p-2 text-rose-500 hover:bg-rose-50 bg-slate-50 rounded-lg"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && !loading && (
          <div className="py-24 text-center text-slate-400 font-black uppercase tracking-widest text-sm">
            Trống ! Không có đồ án nào cần duyệt.
          </div>
        )}
      </div>
    </div>
  );
}
