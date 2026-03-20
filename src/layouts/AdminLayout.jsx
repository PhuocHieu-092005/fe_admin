import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {" "}
      <Sidebar />
      {/* Phần nội dung bên phải */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar phía trên */}
        <Navbar />

        {/* Vùng nội dung có thể cuộn (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
