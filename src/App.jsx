import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/dashboardManagement/Dashboard";
import CvList from "./pages/cvManagement/CvList";
import ProjectList from "./pages/projectManagement/ProjectList";
import ProjectAccessRequestList from "./pages/projectManagement/ProjectAccessRequestList";
import UserList from "./pages/userManagement/UserList";
import TeacherList from "./pages/teacherManagement/TeacherList";
import JobList from "./pages/jobManagement/JobList";
import CourseList from "./pages/courseManagement/CourseList";
import CompanyList from "./pages/companyManagement/CompanyList";
import ListRequestEdit from "./pages/cvEditRequestManagement/ListRequestEdit";
import TeacherProjectEvaluationList from "./pages/teacherProjectEvaluation/TeacherProjectEvaluationList";

// System
import AccessRequests from "./pages/system/AccessRequests";
import CvUpdates from "./pages/system/CvUpdates";
import AuditLogs from "./pages/system/AuditLogs";
import Settings from "./pages/system/Settings";
import Payments from "./pages/system/Payments";
import Notifications from "./pages/system/Notifications";
// teacher
import TeacherProfile from "./pages/teacherManagement/TeacherProfile";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} />}
          >
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<ProjectList />} />
              <Route
                path="/project-access-requests"
                element={<ProjectAccessRequestList />}
              />
              <Route path="/updates" element={<CvUpdates />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/course" element={<CourseList />} />

              <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
                <Route
                  path="/teacher/project-evaluations"
                  element={<TeacherProjectEvaluationList />}
                />
                <Route path="/teacher/profile" element={<TeacherProfile />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/project" element={<ProjectList />} />
                <Route path="/user" element={<UserList />} />
                <Route path="/teacher" element={<TeacherList />} />
                <Route path="/company" element={<CompanyList />} />
                <Route path="/access" element={<AccessRequests />} />
                <Route path="/logs" element={<AuditLogs />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cv" element={<CvList />} />
                <Route path="/job" element={<JobList />} />
                <Route path="/cv-edit-requests" element={<ListRequestEdit />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
