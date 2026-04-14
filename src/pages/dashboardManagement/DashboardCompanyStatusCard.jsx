import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function DashboardCompanyStatusCard({
  approvalRate,
  verifiedCompanies,
  unverifiedCompanies,
  pendingCompanies,
}) {
  return (
    <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black text-slate-900">
        Tình trạng xác minh công ty
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Theo dữ liệu từ module Company Management
      </p>

      <div className="mt-8 rounded-[28px] bg-slate-50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-500">
            Tỉ lệ đã xác minh
          </span>
          <span className="text-lg font-black text-slate-900">
            {approvalRate}%
          </span>
        </div>

        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-black transition-all"
            style={{ width: `${approvalRate}%` }}
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
            <span className="text-sm font-bold text-slate-600">
              Đã xác minh
            </span>
            <span className="text-base font-black text-emerald-600">
              {verifiedCompanies}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
            <span className="text-sm font-bold text-slate-600">
              Chưa xác minh
            </span>
            <span className="text-base font-black text-amber-600">
              {unverifiedCompanies}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
            <span className="text-sm font-bold text-slate-600">
              Đang chờ duyệt
            </span>
            <span className="text-base font-black text-slate-900">
              {pendingCompanies}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-black px-4 py-4 text-white">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Gợi ý quản trị</p>
              <p className="mt-1 text-sm text-white/80">
                Ưu tiên xử lý các công ty đang ở trạng thái PENDING để luồng
                tuyển dụng vận hành mượt hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
