import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/dashboardManagement/Dashboard";
import CvList from "./pages/cvManagement/CvList";
import ProjectList from "./pages/projectManagement/ProjectList";
import UserList from "./pages/userManagement/UserList";
import JobList from "./pages/jobManagement/JobList";
import CourseList from "./pages/courseManagement/CourseList";
import CompanyList from "./pages/companyManagement/CompanyList";

// System
import AccessRequests from "./pages/system/AccessRequests";
import CvUpdates from "./pages/system/CvUpdates";
import AuditLogs from "./pages/system/AuditLogs";
import Settings from "./pages/system/Settings";
import Payments from "./pages/system/Payments";
import Notifications from "./pages/system/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider bọc ngoài để mọi component đều gọi được useAuth() */}
      <AuthProvider>
        <Routes>
          {/* TRANG CÔNG KHAI */}
          <Route path="/login" element={<Login />} />

          {/* CÁC TRANG DÙNG CHUNG CHO ADMIN VÀ TEACHER */}
          <Route
            element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} />}
          >
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<ProjectList />} />
              <Route path="/updates" element={<CvUpdates />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/course" element={<CourseList />} />

              {/* TRANG ĐẶC QUYỀN CHỈ DÀNH CHO ADMIN */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/user" element={<UserList />} />
                <Route path="/company" element={<CompanyList />} />
                <Route path="/access" element={<AccessRequests />} />
                <Route path="/logs" element={<AuditLogs />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cv" element={<CvList />} />
                <Route path="/job" element={<JobList />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
