import React from "react";
import { FileText, FolderKanban, ShieldCheck, Clock3 } from "lucide-react";

export default function DashboardOverviewSection({
  cvsCount,
  projectsCount,
  verifiedCompanies,
  pendingCompanies,
}) {
  return (
    <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900">
          Tổng quan hệ thống
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Các số liệu trọng tâm từ những module bạn đã làm xong
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <FileText size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Tổng CV
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{cvsCount}</h3>
          <p className="mt-2 text-sm text-slate-400">
            Số hồ sơ CV mà admin có thể kiểm duyệt
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <FolderKanban size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Tổng đồ án
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {projectsCount}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Bao gồm toàn bộ đồ án trong admin dashboard
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Công ty đã xác minh
            </span>
          </div>
          <h3 className="text-3xl font-black text-emerald-600">
            {verifiedCompanies}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Các công ty đã được admin duyệt
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <Clock3 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Công ty chờ duyệt
            </span>
          </div>
          <h3 className="text-3xl font-black text-amber-600">
            {pendingCompanies}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Những công ty đang chờ admin xác nhận
          </p>
        </div>
      </div>
    </div>
  );
}
