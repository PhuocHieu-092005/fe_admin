import AdminLayout from "../layouts/AdminLayout";
import StatCards from "../components/Dashboard/StatCards";

function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-lg font-bold mb-4">
        Hệ thống quản lý CV và tuyển dụng khoa CNTT
      </h1>
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm h-64">
          Biểu đồ (New CVs & Projects)
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm h-64">
          User Roles (Chart)
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold mb-4">Recent Activity (Audit Logs)</h3>
        {/* Table ở đây */}
      </div>
    </AdminLayout>
  );
}
