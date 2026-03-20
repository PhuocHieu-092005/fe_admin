import React from "react";
// Import các icon cần thiết từ Heroicons
import {
  Squares2X2Icon, // Dashboard
  DocumentTextIcon, // CV Management
  FolderIcon, // Project Management
  UsersIcon, // User Management
  BriefcaseIcon, // Job Posts
  KeyIcon, // Access Requests
  ArrowPathIcon, // CV Updates
  ClockIcon, // Audit Logs
  CreditCardIcon, // Payments
  Cog6ToothIcon, // Settings
  BellIcon, // Notifications
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const menuGroups = [
    {
      group: "QUẢN LÝ CV & TUYỂN DỤNG CNTT",
      items: [
        { name: "Dashboard", icon: Squares2X2Icon, active: true },
        { name: "CV Management", icon: DocumentTextIcon },
        { name: "Project Management", icon: FolderIcon },
        { name: "User Management", icon: UsersIcon },
        { name: "Job Posts", icon: BriefcaseIcon },
      ],
    },
    {
      group: "HỆ THỐNG",
      items: [
        { name: "Access Requests", icon: KeyIcon },
        { name: "CV Updates", icon: ArrowPathIcon },
        { name: "Audit Logs", icon: ClockIcon },
        { name: "Payments & Wallets", icon: CreditCardIcon },
        { name: "Settings", icon: Cog6ToothIcon },
        { name: "Notifications", icon: BellIcon },
      ],
    },
  ];

  return (
    // Sidebar container tối như ảnh 1
    <div className="w-72 bg-[#1e293b] min-h-screen text-slate-300 flex flex-col border-r border-slate-700/50">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="bg-blue-600 p-2.5 rounded-lg text-white font-bold text-xl flex items-center justify-center">
          A
        </div>
        <span className="font-bold text-xl text-white tracking-tight">
          ADMIN PORTAL
        </span>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto py-5 px-3 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="px-4 mb-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
              {group.group}
            </h3>
            <ul className="space-y-1.5">
              {group.items.map((item, i) => {
                // Render Icon Component
                const Icon = item.icon;
                return (
                  <li key={i}>
                    <a
                      href="#"
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        item.active
                          ? "bg-blue-600 text-white shadow-md"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {/* Tùy chỉnh kích thước và màu icon bằng Tailwind class */}
                      <Icon
                        className={`w-5 h-5 ${item.active ? "text-white" : "text-slate-500 group-hover:text-white"}`}
                        strokeWidth={item.active ? 2 : 1.5} // Icon active nét đậm hơn chút
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
