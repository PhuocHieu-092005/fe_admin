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
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();

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
    <div className="w-72 bg-[#1e293b] min-h-screen text-slate-300 flex flex-col border-r border-slate-700/50">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="bg-blue-600 p-2.5 rounded-lg text-white font-bold text-xl">
          A
        </div>
        <Link to="/" className="font-bold text-xl text-white">
          ADMIN PORTAL
        </Link>{" "}
      </div>

      <div className="flex-1 overflow-y-auto py-5 px-3">
        {/* ===== GROUP 1 ===== */}
        <h3 className="px-4 mb-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          QUẢN LÝ CV & TUYỂN DỤNG CNTT
        </h3>

        <ul className="space-y-1.5 mb-8">
          <li>
            <Link to="/" className={linkClass("/")}>
              <Squares2X2Icon className={iconClass("/")} />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/cv" className={linkClass("/cv")}>
              <DocumentTextIcon className={iconClass("/cv")} />
              <span>CV Management</span>
            </Link>
          </li>

          <li>
            <Link to="/project" className={linkClass("/project")}>
              <FolderIcon className={iconClass("/project")} />
              <span>Project Management</span>
            </Link>
          </li>

          <li>
            <Link to="/user" className={linkClass("/user")}>
              <UsersIcon className={iconClass("/user")} />
              <span>User Management</span>
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
        </ul>

        {/* ===== GROUP 2 ===== */}
        <h3 className="px-4 mb-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          HỆ THỐNG
        </h3>

        <ul className="space-y-1.5">
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
