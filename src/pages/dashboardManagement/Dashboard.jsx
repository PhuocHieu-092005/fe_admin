import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  GraduationCap,
  Building2,
  FolderKanban,
  FileText,
  BookOpen,
} from "lucide-react";

import adminService from "../../services/adminService";
import studentService from "../../services/studentService";
import teacherService from "../../services/teacherService";
import companyService from "../../services/companyService";
import courseService from "../../services/courseService";
import projectService from "../../services/projectService";
import cvService from "../../services/cvService";

import DashboardHeader from "./DashboardHeader";
import DashboardStatCard from "./DashboardStatCard";
import DashboardQuickActionCard from "./DashboardQuickActionCard";
import DashboardOverviewSection from "./DashboardOverviewSection";
import DashboardCompanyStatusCard from "./DashboardCompanyStatusCard";

function normalizeArrayResponse(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.content)) return res.data.content;
  if (Array.isArray(res?.content)) return res.content;
  return [];
}

function getProjectCount(res) {
  if (typeof res?.data?.totalElements === "number") {
    return res.data.totalElements;
  }
  if (Array.isArray(res?.data?.content)) {
    return res.data.content.length;
  }
  if (Array.isArray(res?.data)) {
    return res.data.length;
  }
  return 0;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [adminName, setAdminName] = useState("Admin");

  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [cvsCount, setCvsCount] = useState(0);

  const [verifiedCompanies, setVerifiedCompanies] = useState(0);
  const [unverifiedCompanies, setUnverifiedCompanies] = useState(0);
  const [pendingCompanies, setPendingCompanies] = useState(0);

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const results = await Promise.allSettled([
        adminService.getMyAdminProfile(),
        studentService.getStudents(),
        teacherService.getTeachers(),
        companyService.getCompanies(),
        courseService.getCourses(),
        projectService.getAdminProjects({ page: 0, size: 10 }),
        cvService.getAllCvs(),
      ]);

      const [
        adminRes,
        studentRes,
        teacherRes,
        companyRes,
        courseRes,
        projectRes,
        cvRes,
      ] = results;

      if (adminRes.status === "fulfilled") {
        const adminData = adminRes.value?.data || {};
        setAdminName(
          adminData?.full_name ||
            adminData?.fullName ||
            adminData?.username ||
            "Admin",
        );
      }

      if (studentRes.status === "fulfilled") {
        const students = normalizeArrayResponse(studentRes.value);
        setStudentsCount(students.length);
      }

      if (teacherRes.status === "fulfilled") {
        const teachers = normalizeArrayResponse(teacherRes.value);
        setTeachersCount(teachers.length);
      }

      if (companyRes.status === "fulfilled") {
        const companies = normalizeArrayResponse(companyRes.value);
        setCompaniesCount(companies.length);

        const verified = companies.filter((item) => item?.isVerified).length;
        const pending = companies.filter(
          (item) => item?.status === "PENDING",
        ).length;

        setVerifiedCompanies(verified);
        setUnverifiedCompanies(companies.length - verified);
        setPendingCompanies(pending);
      }

      if (courseRes.status === "fulfilled") {
        const courses = normalizeArrayResponse(courseRes.value);
        setCoursesCount(courses.length);
      }

      if (projectRes.status === "fulfilled") {
        setProjectsCount(getProjectCount(projectRes.value));
      }

      if (cvRes.status === "fulfilled") {
        const cvs = normalizeArrayResponse(cvRes.value);
        setCvsCount(cvs.length);
      }
    } catch (error) {
      console.error("Lỗi tải dashboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const approvalRate = useMemo(() => {
    if (companiesCount === 0) return 0;
    return Math.round((verifiedCompanies / companiesCount) * 100);
  }, [companiesCount, verifiedCompanies]);

  if (loading) {
    return (
      <div className="w-full bg-[#f8fafc] px-6 py-6 text-left text-black lg:px-8">
        <div className="rounded-[28px] border border-slate-100 bg-white p-10 shadow-sm">
          <div className="flex min-h-[420px] flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-black"></div>
            <p className="mt-5 text-sm font-medium text-slate-400">
              Đang tải dữ liệu dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc]  text-left text-black">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <DashboardHeader
          adminName={adminName}
          refreshing={refreshing}
          onRefresh={() => fetchDashboardData(true)}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            title="Tổng sinh viên"
            value={studentsCount}
            icon={Users}
            subText="Số lượng sinh viên đang có trong hệ thống"
          />
          <DashboardStatCard
            title="Tổng giảng viên"
            value={teachersCount}
            icon={GraduationCap}
            subText="Giảng viên đang được quản lý trong hệ thống"
          />
          <DashboardStatCard
            title="Tổng công ty"
            value={companiesCount}
            icon={Building2}
            subText="Bao gồm công ty đã xác minh và chưa xác minh"
          />
          <DashboardStatCard
            title="Tổng khóa học"
            value={coursesCount}
            icon={BookOpen}
            subText="Các khóa học hiện có trong cổng quản trị"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
          <DashboardOverviewSection
            cvsCount={cvsCount}
            projectsCount={projectsCount}
            verifiedCompanies={verifiedCompanies}
            pendingCompanies={pendingCompanies}
          />

          <DashboardCompanyStatusCard
            approvalRate={approvalRate}
            verifiedCompanies={verifiedCompanies}
            unverifiedCompanies={unverifiedCompanies}
            pendingCompanies={pendingCompanies}
          />
        </div>

        <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">
              Đi nhanh tới các khu vực quản lý
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Mở nhanh những module bạn đã xây dựng trong admin dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <DashboardQuickActionCard
              to="/user"
              title="User Management"
              description="Xem, cập nhật và quản lý danh sách sinh viên trong hệ thống."
              icon={Users}
            />
            <DashboardQuickActionCard
              to="/teacher"
              title="Teacher Management"
              description="Quản lý giảng viên, xem chi tiết và xử lý dữ liệu giảng viên."
              icon={GraduationCap}
            />
            <DashboardQuickActionCard
              to="/company"
              title="Company Management"
              description="Kiểm tra công ty, duyệt xác minh và xem chi tiết doanh nghiệp."
              icon={Building2}
            />
            <DashboardQuickActionCard
              to="/course"
              title="Course Management"
              description="Tạo, sửa, xóa khóa học và phân công giảng viên vào khóa học."
              icon={BookOpen}
            />
            <DashboardQuickActionCard
              to="/project"
              title="Project Management"
              description="Theo dõi và kiểm duyệt đồ án của sinh viên trong hệ thống."
              icon={FolderKanban}
            />
            <DashboardQuickActionCard
              to="/cv"
              title="CV Management"
              description="Xem CV, preview nội dung và kiểm duyệt CV từ sinh viên."
              icon={FileText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
