import React from "react";
import { LayoutDashboard, RefreshCcw } from "lucide-react";

export default function DashboardHeader({ adminName, refreshing, onRefresh }) {
  return (
    <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm lg:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600">
            <LayoutDashboard size={16} />
            Bảng điều khiển quản trị
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">
            Xin chào, {adminName}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
            Theo dõi nhanh toàn bộ hệ thống: sinh viên, giảng viên, công ty,
            khóa học, CV và đồ án. Đây là khu vực tổng quan để bạn nắm tình hình
            trước khi đi vào từng trang quản lý chi tiết.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCcw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Đang làm mới..." : "Làm mới dữ liệu"}
        </button>
      </div>
    </div>
  );
}
