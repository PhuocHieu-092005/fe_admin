import {
  Squares2X2Icon,
  DocumentTextIcon,
  FolderIcon,
  UsersIcon,
  BriefcaseIcon,
  KeyIcon,
  ArrowPathIcon,
  ClockIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  BellIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isTeacher = user?.role === "TEACHER";
  const isAdmin = user?.role === "ADMIN";

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive(path)
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-slate-800 hover:text-white"
    }`;

  const iconClass = (path) =>
    `w-5 h-5 ${
      isActive(path) ? "text-white" : "text-slate-500 group-hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen w-72 flex-col border-r border-slate-700/50 bg-[#1e293b] text-slate-300">
      <div className="flex items-center gap-3 border-b border-slate-700/50 p-6">
        <div className="rounded-lg bg-blue-600 p-2.5 text-xl font-bold text-white"></div>
        <Link to="/" className="text-xl font-bold text-white">
          {isTeacher ? "TEACHER PORTAL" : "ADMIN PORTAL"}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <h3 className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {isTeacher ? "KHÔNG GIAN GIẢNG VIÊN" : "QUẢN LÝ CV & TUYỂN DỤNG CNTT"}
        </h3>

        <ul className="mb-8 space-y-1.5">
          <li>
            <Link to="/" className={linkClass("/")}>
              <Squares2X2Icon className={iconClass("/")} />
              <span>Dashboard</span>
            </Link>
          </li>

          {isTeacher ? (
            <li>
              <Link
                to="/teacher/project-evaluations"
                className={linkClass("/teacher/project-evaluations")}
              >
                <ClipboardDocumentCheckIcon
                  className={iconClass("/teacher/project-evaluations")}
                />
                <span>Đánh giá đồ án</span>
              </Link>
            </li>
          ) : null}

          {isAdmin ? (
            <>
              <li>
                <Link to="/cv" className={linkClass("/cv")}>
                  <DocumentTextIcon className={iconClass("/cv")} />
                  <span>CV Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cv-edit-requests"
                  className={linkClass("/cv-edit-requests")}
                >
                  <DocumentTextIcon className={iconClass("/cv")} />
                  <span>CV Edit Requests</span>
                </Link>
              </li>
              <li>
                <Link to="/project" className={linkClass("/project")}>
                  <FolderIcon className={iconClass("/project")} />
                  <span>Project Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/project-access-requests"
                  className={linkClass("/project-access-requests")}
                >
                  <ClipboardDocumentListIcon
                    className={iconClass("/project-access-requests")}
                  />
                  <span>Project Access Requests</span>
                </Link>
              </li>
              <li>
                <Link to="/user" className={linkClass("/user")}>
                  <UsersIcon className={iconClass("/user")} />
                  <span>User Management</span>
                </Link>
              </li>
              <li>
                <Link to="/teacher" className={linkClass("/teacher")}>
                  <UsersIcon className={iconClass("/teacher")} />
                  <span>Teacher Management</span>
                </Link>
              </li>
              <li>
                <Link to="/job" className={linkClass("/job")}>
                  <BriefcaseIcon className={iconClass("/job")} />
                  <span>Job Posts</span>
                </Link>
              </li>
              <li>
                <Link to="/company" className={linkClass("/company")}>
                  <BuildingOffice2Icon className={iconClass("/company")} />
                  <span>Company Management</span>
                </Link>
              </li>
              <li>
                <Link to="/course" className={linkClass("/course")}>
                  <AcademicCapIcon className={iconClass("/course")} />
                  <span>Course Management</span>
                </Link>
              </li>
            </>
          ) : null}
        </ul>

        <h3 className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {isTeacher ? "TIỆN ÍCH" : "HỆ THỐNG"}
        </h3>

        <ul className="space-y-1.5">
          {isAdmin ? (
            <>
              <li>
                <Link to="/access" className={linkClass("/access")}>
                  <KeyIcon className={iconClass("/access")} />
                  <span>Access Requests</span>
                </Link>
              </li>
              <li>
                <Link to="/updates" className={linkClass("/updates")}>
                  <ArrowPathIcon className={iconClass("/updates")} />
                  <span>CV Updates</span>
                </Link>
              </li>
              <li>
                <Link to="/logs" className={linkClass("/logs")}>
                  <ClockIcon className={iconClass("/logs")} />
                  <span>Audit Logs</span>
                </Link>
              </li>
              <li>
                <Link to="/payments" className={linkClass("/payments")}>
                  <CreditCardIcon className={iconClass("/payments")} />
                  <span>Payments & Wallets</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className={linkClass("/settings")}>
                  <Cog6ToothIcon className={iconClass("/settings")} />
                  <span>Settings</span>
                </Link>
              </li>
            </>
          ) : null}

          <li>
            <Link to="/notifications" className={linkClass("/notifications")}>
              <BellIcon className={iconClass("/notifications")} />
              <span>Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
