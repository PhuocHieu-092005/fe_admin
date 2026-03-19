import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <AdminLayout>
      {/* Nội dung chính của Admin sẽ hiện ở đây */}
      <div className="card bg-grey p-6 shadow-xl">
        <h1 className="text-2xl font-bold">Chào mừng Admin Hiếu!</h1>
        <p className="mt-4">Đây là nơi bạn sẽ duyệt CV và quản lý hệ thống.</p>
        
        <div className="stats shadow mt-6 w-full">
          <div className="stat">
            <div className="stat-title">CV chờ duyệt</div>
            <div className="stat-value text-primary">...</div>
          </div>
          <div className="stat">
            <div className="stat-title">Doanh nghiệp mới</div>
            <div className="stat-value text-secondary">...</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default App;