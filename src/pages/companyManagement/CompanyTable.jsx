import React from "react";
import { Eye, Trash2, Building2, CheckCircle2, XCircle } from "lucide-react";

function getStatusClass(status) {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-50 text-emerald-600";
    case "REJECTED":
      return "bg-rose-50 text-rose-600";
    case "PENDING":
      return "bg-amber-50 text-amber-600";
    default:
      return "bg-slate-100 text-slate-700";
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
    <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="p-6 text-base font-black">ID</th>
              <th className="p-6 text-base font-black">Công ty</th>
              <th className="p-6 text-base font-black">Liên hệ</th>
              <th className="p-6 text-center text-base font-black">
                Trạng thái
              </th>
              <th className="p-6 text-center text-base font-black">Xác minh</th>
              <th className="p-6 text-right text-base font-black">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-20 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
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
                  <td className="p-6 font-mono text-sm text-slate-500">
                    #{company.id}
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          {company.companyName || "Chưa rõ"}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {company.taxCode || "Chưa rõ MST"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-6">
                    <p className="font-semibold text-slate-700">
                      {company.phone || "Chưa rõ"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {company.email || "Chưa rõ"}
                    </p>
                  </td>

                  <td className="p-6 text-center">
                    <span
                      className={`rounded-2xl px-4 py-2 text-sm font-bold ${getStatusClass(
                        company.status,
                      )}`}
                    >
                      {company.status || "Chưa rõ"}
                    </span>
                  </td>

                  <td className="p-6 text-center">
                    <span
                      className={`rounded-2xl px-4 py-2 text-sm font-bold ${
                        company.isVerified
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {company.isVerified ? "Đã xác minh" : "Chưa xác minh"}
                    </span>
                  </td>

                  <td className="p-6">
                    <div className="flex flex-wrap justify-end gap-3">
                      {company.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => onApproveCompany(company)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-600 transition-all hover:bg-emerald-50"
                          >
                            <CheckCircle2 size={15} />
                            Duyệt
                          </button>

                          <button
                            onClick={() => onRejectCompany(company)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 px-4 py-2 text-sm font-bold text-amber-600 transition-all hover:bg-amber-50"
                          >
                            <XCircle size={15} />
                            Từ chối
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => onViewDetail(company.id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                      >
                        <Eye size={15} />
                        Xem
                      </button>

                      <button
                        onClick={() => onDeleteCompany(company)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50"
                      >
                        <Trash2 size={15} />
                        Xóa
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
