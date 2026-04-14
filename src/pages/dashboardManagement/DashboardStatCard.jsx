import React from "react";

export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  subText,
  valueClassName = "text-slate-900",
}) {
  return (
    <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
        <Icon size={22} />
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <h3 className={`mt-3 text-4xl font-black ${valueClassName}`}>{value}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{subText}</p>
    </div>
  );
}
