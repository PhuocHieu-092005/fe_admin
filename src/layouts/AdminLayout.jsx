const AdminLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Navbar cho Admin */}
        <div className="navbar bg-base-100 shadow-sm lg:hidden">
          <label htmlFor="admin-drawer" className="btn btn-ghost lg:hidden">Menu</label>
          <div className="flex-1 px-2">ADMIN PANEL</div>
        </div>
        
        <main className="p-6">{children}</main>
      </div> 

      {/* Sidebar Menu */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content border-r">
          <li className="text-2xl font-bold p-4 text-primary">ADMIN DASHBOARD</li>
          <div className="divider">QUẢN LÝ</div>
          <li><a>Duyệt CV Sinh Viên</a></li>
          <li><a>Duyệt Tin Tuyển Dụng</a></li>
          <li><a>Duyệt Doanh Nghiệp</a></li>
          <div className="divider">HỆ THỐNG</div>
          <li><a>Quản lý Người dùng</a></li>
          <li><a>Audit Logs</a></li>
          <li><a>Cài đặt</a></li>
        </ul>
      </div>
    </div>
  );
};
export default AdminLayout;