import React from "react";
import {
  X,
  Building2,
  Mail,
  Globe,
  MapPin,
  Phone,
  BadgeCheck,
} from "lucide-react";

const DEFAULT_COMPANY_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <circle cx="100" cy="78" r="32" fill="#94a3b8"/>
      <rect x="50" y="122" width="100" height="42" rx="20" fill="#94a3b8"/>
      <text x="100" y="188" text-anchor="middle" font-size="18" fill="#475569" font-family="Arial">
        Company
      </text>
    </svg>
  `);

export default function CompanyDetailModal({ company, onClose }) {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-black hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-8 flex flex-col gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={company.avatarUrl || DEFAULT_COMPANY_AVATAR}
              alt="Company avatar"
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_COMPANY_AVATAR;
              }}
            />

            <div>
              <h2 className="text-3xl font-black text-slate-900">
                {company.companyName || "Chưa rõ"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Chi tiết đầy đủ của công ty
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Trạng thái
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {company.status || "Chưa rõ"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Xác minh
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {company.isVerified ? "Đã xác minh" : "Chưa xác minh"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Building2 size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Tên công ty
              </span>
            </div>
            <p className="font-bold text-slate-900">
              {company.companyName || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Mail size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Email
              </span>
            </div>
            <p className="break-words font-bold text-slate-900">
              {company.email || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <BadgeCheck size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                ID
              </span>
            </div>
            <p className="font-bold text-slate-900">#{company.id || "N/A"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Mã số thuế
            </p>
            <p className="mt-2 font-bold text-slate-900">
              {company.taxCode || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Phone size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Số điện thoại
              </span>
            </div>
            <p className="font-bold text-slate-900">
              {company.phone || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <MapPin size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Khu vực
              </span>
            </div>
            <p className="font-bold text-slate-900">
              {company.location || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2 xl:col-span-3">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
              <Globe size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Website
              </span>
            </div>
            <p className="break-words font-bold text-slate-900">
              {company.website || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2 xl:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Địa chỉ
            </p>
            <p className="mt-2 font-bold text-slate-900">
              {company.address || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2 xl:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Mô tả công ty
            </p>
            <p className="mt-2 whitespace-pre-line font-medium text-slate-800">
              {company.description || "Chưa có mô tả"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
