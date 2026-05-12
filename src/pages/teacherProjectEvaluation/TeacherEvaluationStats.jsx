import React from "react";

export default function TeacherEvaluationStats({ stats }) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Tổng đồ án
        </p>
        <h3 className="mt-1 text-2xl font-black text-slate-900">
          {stats.total}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-emerald-50 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">
          Đã có đánh giá
        </p>
        <h3 className="mt-1 text-2xl font-black text-emerald-700">
          {stats.evaluated}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-amber-50 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
          Chưa đánh giá
        </p>
        <h3 className="mt-1 text-2xl font-black text-amber-700">
          {stats.pending}
        </h3>
      </div>
    </div>
  );
}
