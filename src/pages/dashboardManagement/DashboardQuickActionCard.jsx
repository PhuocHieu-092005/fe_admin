import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function DashboardQuickActionCard({
  to,
  title,
  description,
  icon: Icon,
}) {
  return (
    <Link
      to={to}
      className="group rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition-all group-hover:bg-black group-hover:text-white">
        <Icon size={22} />
      </div>

      <h3 className="text-lg font-black text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>

      <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-700">
        Mở trang
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}
