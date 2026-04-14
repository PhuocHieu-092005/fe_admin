import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Building2, BadgeCheck, ShieldCheck } from "lucide-react";
import companyService from "../../services/companyService";
import adminService from "../../services/adminService";
import CompanyTable from "./CompanyTable";
import CompanyDetailModal from "./CompanyDetailModal";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [adminId, setAdminId] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await companyService.getCompanies();
      const list = res?.data || [];
      setCompanies(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(
        "Lỗi lấy danh sách công ty:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể tải danh sách công ty!", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyAdmin = async () => {
    try {
      const res = await adminService.getMyAdminProfile();
      setAdminId(res?.data?.id || null);
    } catch (error) {
      console.error(
        "Lỗi lấy thông tin admin hiện tại:",
        error?.response?.data || error,
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchMyAdmin();
  }, []);

  const handleViewDetail = async (id) => {
    try {
      setDetailLoading(true);
      const res = await companyService.getCompanyById(id);
      setSelectedCompany(res?.data || null);
    } catch (error) {
      console.error(
        "Lỗi lấy chi tiết công ty:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể lấy chi tiết công ty!", "error");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDeleteCompany = async (company) => {
    const result = await Swal.fire({
      title: "Xóa công ty?",
      text: `Bạn có chắc muốn xóa công ty "${company.companyName}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      await companyService.deleteCompanyByAdmin(company.id);

      Swal.fire("Thành công", "Đã xóa công ty!", "success");

      if (selectedCompany?.id === company.id) {
        setSelectedCompany(null);
      }

      fetchCompanies();
    } catch (error) {
      console.error("Lỗi xóa công ty:", error?.response?.data || error);
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message ||
          error?.response?.data?.data ||
          "Không thể xóa công ty!",
        "error",
      );
    }
  };

  const handleUpdateCompanyStatus = async (company, nextStatus) => {
    if (!adminId) {
      Swal.fire("Lỗi", "Không lấy được adminId hiện tại!", "error");
      return;
    }

    const title =
      nextStatus === "APPROVED" ? "Duyệt công ty?" : "Từ chối công ty?";

    const text =
      nextStatus === "APPROVED"
        ? `Bạn có chắc muốn duyệt công ty "${company.companyName}" không?`
        : `Bạn có chắc muốn từ chối công ty "${company.companyName}" không?`;

    const result = await Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      confirmButtonColor: nextStatus === "APPROVED" ? "#059669" : "#d97706",
    });

    if (!result.isConfirmed) return;

    try {
      await companyService.updateCompanyStatusByAdmin(
        company.id,
        nextStatus,
        adminId,
      );

      Swal.fire(
        "Thành công",
        nextStatus === "APPROVED" ? "Đã duyệt công ty!" : "Đã từ chối công ty!",
        "success",
      );

      if (selectedCompany?.id === company.id) {
        const detailRes = await companyService.getCompanyById(company.id);
        setSelectedCompany(detailRes?.data || null);
      }

      fetchCompanies();
    } catch (error) {
      console.error(
        "Lỗi cập nhật trạng thái công ty:",
        error?.response?.data || error,
      );
      Swal.fire(
        "Lỗi",
        error?.response?.data?.message ||
          error?.response?.data?.data ||
          "Không thể cập nhật trạng thái công ty!",
        "error",
      );
    }
  };

  const totalCompanies = companies.length;
  const verifiedCompanies = companies.filter((item) => item.isVerified).length;
  const unverifiedCompanies = totalCompanies - verifiedCompanies;

  return (
    <div className="min-h-screen bg-white p-8 text-left text-black">
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-black">Quản lý công ty</h1>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Xem danh sách, chi tiết, duyệt và xóa công ty trong hệ thống
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <Building2 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Tổng công ty
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">
            {totalCompanies}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <BadgeCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Đã xác minh
            </span>
          </div>
          <h3 className="text-3xl font-black text-emerald-600">
            {verifiedCompanies}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Chưa xác minh
            </span>
          </div>
          <h3 className="text-3xl font-black text-amber-600">
            {unverifiedCompanies}
          </h3>
        </div>
      </div>

      <CompanyTable
        companies={companies}
        loading={loading}
        onViewDetail={handleViewDetail}
        onDeleteCompany={handleDeleteCompany}
        onApproveCompany={(company) =>
          handleUpdateCompanyStatus(company, "APPROVED")
        }
        onRejectCompany={(company) =>
          handleUpdateCompanyStatus(company, "REJECTED")
        }
      />

      {detailLoading && (
        <div className="mt-6 text-sm font-medium text-slate-400">
          Đang tải chi tiết công ty...
        </div>
      )}

      <CompanyDetailModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}
