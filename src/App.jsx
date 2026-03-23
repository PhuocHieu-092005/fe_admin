import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/dashboardManagement/Dashboard";
import CvList from "./pages/cvManagement/CvList";
import ProjectList from "./pages/projectManagement/ProjectList";
import UserList from "./pages/userManagement/userList";
import JobList from "./pages/jobManagement/JobList";
//System
import AccessRequests from "./pages/system/AccessRequests";
import CvUpdates from "./pages/system/CvUpdates";
import AuditLogs from "./pages/system/AuditLogs";
import Settings from "./pages/system/Settings";
import Payments from "./pages/system/Payments";
import Notifications from "./pages/system/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cv" element={<CvList />} />
          <Route path="/project" element={<ProjectList />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/job" element={<JobList />} />

          {/* SYSTEM */}
          <Route path="/access" element={<AccessRequests />} />
          <Route path="/updates" element={<CvUpdates />} />
          <Route path="/logs" element={<AuditLogs />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
