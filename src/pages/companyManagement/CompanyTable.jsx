import React from "react";
import { Eye, Trash2, Building2, CheckCircle2, XCircle } from "lucide-react";

function getStatusClass(status) {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "REJECTED":
      return "bg-rose-50 text-rose-600 border-rose-100";
    case "PENDING":
      return "bg-amber-50 text-amber-600 border-amber-100";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function CompanyTable({
  companies,
  loading,
  onViewDetail,
  onDeleteCompany,
  onApproveCompany,
  onRejectCompany,
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="whitespace-nowrap p-5 text-sm font-bold text-slate-600">
                ID
              </th>
              <th className="whitespace-nowrap p-5 text-sm font-bold text-slate-600">
                Công ty
              </th>
              <th className="whitespace-nowrap p-5 text-sm font-bold text-slate-600">
                Liên hệ
              </th>
              <th className="whitespace-nowrap p-5 text-center text-sm font-bold text-slate-600">
                Trạng thái
              </th>
              <th className="whitespace-nowrap p-5 text-center text-sm font-bold text-slate-600">
                Xác minh
              </th>
              <th className="whitespace-nowrap p-5 text-right text-sm font-bold text-slate-600">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-20 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"></div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Đang tải dữ liệu...
                  </p>
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-20 text-center text-sm font-medium text-slate-400"
                >
                  Chưa có công ty nào.
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr
                  key={company.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="p-5 font-mono text-xs text-slate-400">
                    #{company.id}
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Building2 size={18} />
                      </div>
                      <div className="min-w-[150px]">
                        <p className="line-clamp-1 font-bold text-slate-800">
                          {company.companyName || "Chưa rõ"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {company.taxCode || "Chưa rõ MST"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5">
                    <p className="whitespace-nowrap text-sm font-semibold text-slate-700">
                      {company.phone || "Chưa rõ"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {company.email || "Chưa rõ"}
                    </p>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`inline-block min-w-[100px] rounded-full border px-3 py-1 text-[11px] font-black tracking-wider ${getStatusClass(company.status)}`}
                    >
                      {company.status}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`inline-block min-w-[110px] rounded-full border px-3 py-1 text-[11px] font-black tracking-wider ${
                        company.isVerified
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {company.isVerified ? "ĐÃ XÁC MINH" : "CHƯA XÁC MINH"}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center justify-end gap-2">
                      {company.status === "PENDING" && (
                        <div className="flex gap-2 border-r border-slate-200 pr-2">
                          <button
                            onClick={() => onApproveCompany(company)}
                            className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg bg-emerald-600 px-3 text-[11px] font-bold text-white transition-all hover:bg-emerald-700 active:scale-95"
                          >
                            <CheckCircle2 size={14} /> Duyệt
                          </button>
                          <button
                            onClick={() => onRejectCompany(company)}
                            className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border border-rose-200 bg-white px-3 text-[11px] font-bold text-rose-600 transition-all hover:bg-rose-50 active:scale-95"
                          >
                            <XCircle size={14} /> Từ chối
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => onViewDetail(company.id)}
                        className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
                      >
                        <Eye size={14} /> Xem
                      </button>

                      <button
                        onClick={() => onDeleteCompany(company)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-500 transition-all hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                        title="Xóa"
                      >
                        <Trash2 size={14} />
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
  );
}
