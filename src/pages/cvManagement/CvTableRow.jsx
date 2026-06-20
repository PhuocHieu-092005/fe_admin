import React from "react";

const statusStyle = {
  APPROVED: "border-emerald-500 text-emerald-600",
  REJECTED: "border-rose-500 text-rose-600",
  PENDING: "border-amber-500 text-amber-600",
};

const statusLabel = {
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
  PENDING: "Chờ duyệt",
};

export default function CvTableRow({ cv, onOpenDetails }) {
  return (
    <tr className="group hover:bg-slate-50/50 transition-colors">
      <td className="p-6 font-mono text-sm">#{cv.id}</td>
      <td className="p-6">
        {/* --- PHẦN SỬA --- */}
        {/* Lấy thẳng tên sinh viên từ API hiển thị chữ to */}
        <p className="font-bold text-black">{cv.student_name}</p>
        {/* Tiêu đề CV hiển thị chữ nhỏ xám bên dưới cho đẹp và rõ ràng */}
        <p className="text-xs font-medium text-slate-500 mt-1">{cv.title}</p>
        {/* ---------------- */}
      </td>
      <td className="p-6 text-center">
        <span className="px-2.5 text-[9px] font-black uppercase">
          {cv.type}
        </span>
      </td>
      <td className="p-6 text-center">
        <span
          className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 inline-block min-w-[100px] ${statusStyle[cv.status]}`}
        >
          {statusLabel[cv.status]}
        </span>
      </td>
      <td className="p-6 text-right">
        <button
          onClick={() => onOpenDetails(cv.id)}
          className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          Kiểm duyệt
        </button>
      </td>
    </tr>
  );
}
