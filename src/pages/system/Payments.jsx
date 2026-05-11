import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  BadgeDollarSign,
  Banknote,
  CheckCircle2,
  Clock3,
  RefreshCcw,
  WalletCards,
  XCircle,
} from "lucide-react";
import withdrawalService from "../../services/withdrawalService";

export default function Payments() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await withdrawalService.getAdminWithdrawals();
      const list = res?.data || [];
      setWithdrawals(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách yêu cầu rút tiền:",
        error?.response?.data || error,
      );
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message ||
          "Không thể tải danh sách yêu cầu rút tiền!",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const stats = useMemo(() => {
    return withdrawals.reduce(
      (result, item) => {
        result.total += Number(item.amount || 0);
        result[item.status] = (result[item.status] || 0) + 1;
        return result;
      },
      { total: 0, PENDING: 0, APPROVED: 0, REJECTED: 0 },
    );
  }, [withdrawals]);

  const formatMoney = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const formatDate = (value) => {
    if (!value) return "Chưa rõ";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Chưa rõ";

    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const getCreatedDate = (withdrawal) =>
    withdrawal.createdAt ||
    withdrawal.requestedAt ||
    withdrawal.requestDate ||
    withdrawal.createdDate;

  const getUpdatedDate = (withdrawal) =>
    withdrawal.updatedAt ||
    withdrawal.processedAt ||
    withdrawal.updatedDate ||
    withdrawal.modifiedAt;

  const getStatusLabel = (status) => {
    switch (status) {
      case "APPROVED":
        return "Đã duyệt";
      case "REJECTED":
        return "Đã từ chối";
      case "PENDING":
        return "Chờ xử lý";
      default:
        return status || "Chưa rõ";
    }
  };

  const getStatusClass = (status) => {
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
  };

  const handleUpdateWithdrawal = async (withdrawal, nextStatus) => {
    const isApproved = nextStatus === "APPROVED";
    const actionText = isApproved ? "duyệt" : "từ chối";

    const result = await Swal.fire({
      title: isApproved ? "Duyệt yêu cầu rút tiền?" : "Từ chối yêu cầu rút tiền?",
      text: `Yêu cầu #${withdrawal.id} của ${withdrawal.userEmail || "sinh viên"} sẽ được ${actionText}.`,
      input: "textarea",
      inputLabel: "Ghi chú của admin",
      inputPlaceholder: isApproved
        ? "Nhập ghi chú xử lý giao dịch..."
        : "Nhập lý do từ chối...",
      inputAttributes: {
        "aria-label": "Ghi chú của admin",
      },
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      confirmButtonColor: isApproved ? "#059669" : "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      setProcessingId(withdrawal.id);
      await withdrawalService.updateAdminWithdrawal(withdrawal.id, {
        status: nextStatus,
        adminNote: result.value || "",
      });

      Swal.fire(
        "Thành công",
        isApproved
          ? "Đã duyệt yêu cầu rút tiền!"
          : "Đã từ chối yêu cầu rút tiền!",
        "success",
      );
      fetchWithdrawals();
    } catch (error) {
      console.error(
        "Lỗi xử lý yêu cầu rút tiền:",
        error?.response?.data || error,
      );
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message ||
          error?.response?.data?.data ||
          "Không thể xử lý yêu cầu rút tiền!",
        "error",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 text-left text-black">
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-black">
            Payments & Wallets
          </h1>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Theo dõi và xử lý yêu cầu rút tiền từ sinh viên
          </p>
        </div>

        <button
          onClick={fetchWithdrawals}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          Tải lại
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <WalletCards size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Tổng yêu cầu
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {withdrawals.length}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <Clock3 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Chờ xử lý
            </span>
          </div>
          <h3 className="text-3xl font-black text-amber-600">
            {stats.PENDING}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <CheckCircle2 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Đã duyệt
            </span>
          </div>
          <h3 className="text-3xl font-black text-emerald-600">
            {stats.APPROVED}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <BadgeDollarSign size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Tổng tiền
            </span>
          </div>
          <h3 className="text-2xl font-black text-blue-600">
            {formatMoney(stats.total)}
          </h3>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[6%]" />
              <col className="w-[22%]" />
              <col className="w-[20%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[15%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-8 py-6 text-sm font-black">ID</th>
                <th className="px-6 py-6 text-sm font-black">Sinh viên</th>
                <th className="px-6 py-6 text-sm font-black">Ngân hàng</th>
                <th className="px-6 py-6 text-right text-sm font-black">
                  Số tiền
                </th>
                <th className="px-6 py-6 text-center text-sm font-black">
                  Trạng thái
                </th>
                <th className="px-6 py-6 text-sm font-black">Thời gian</th>
                <th className="px-8 py-6 text-right text-sm font-black">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-20 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      Đang tải dữ liệu...
                    </p>
                  </td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-20 text-center text-sm font-medium text-slate-400"
                  >
                    Chưa có yêu cầu rút tiền nào.
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr
                    key={withdrawal.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-8 py-7 font-mono text-sm text-slate-500">
                      #{withdrawal.id}
                    </td>

                    <td className="px-6 py-7">
                      <p className="truncate font-bold text-slate-900">
                        {withdrawal.userEmail || "Chưa rõ email"}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        User ID: {withdrawal.userId || "Chưa rõ"}
                      </p>
                    </td>

                    <td className="px-6 py-7">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <Banknote size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-700">
                            {withdrawal.bankName || "Chưa rõ ngân hàng"}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-slate-400">
                            {withdrawal.accountNumber || "Chưa rõ tài khoản"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-7 text-right text-base font-black text-slate-900">
                      {formatMoney(withdrawal.amount)}
                    </td>

                    <td className="px-6 py-7 text-center">
                      <span
                        className={`inline-flex min-w-[96px] items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold ${getStatusClass(
                          withdrawal.status,
                        )}`}
                      >
                        {getStatusLabel(withdrawal.status)}
                      </span>
                    </td>

                    <td className="px-6 py-7">
                      <p className="text-sm font-semibold text-slate-700">
                        {formatDate(getCreatedDate(withdrawal))}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Cập nhật: {formatDate(getUpdatedDate(withdrawal))}
                      </p>
                    </td>

                    <td className="px-8 py-7">
                      <div className="flex flex-col items-end gap-3">
                        {withdrawal.status === "PENDING" ? (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateWithdrawal(withdrawal, "APPROVED")
                              }
                              disabled={processingId === withdrawal.id}
                              className="inline-flex min-w-[104px] items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-600 transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <CheckCircle2 size={15} />
                              Duyệt
                            </button>

                            <button
                              onClick={() =>
                                handleUpdateWithdrawal(withdrawal, "REJECTED")
                              }
                              disabled={processingId === withdrawal.id}
                              className="inline-flex min-w-[104px] items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <XCircle size={15} />
                              Từ chối
                            </button>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-slate-400">
                            Đã xử lý
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
