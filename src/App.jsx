import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import CvList from "./pages/cvManagement/CvList";
import ProjectList from "./pages/projectManagement/ProjectList";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cv" element={<CvList />} />
          <Route path="/project" element={<ProjectList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
