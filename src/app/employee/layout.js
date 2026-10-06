"use client";

import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import { usePathname } from "next/navigation";

export default function EmployeeLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Derive title from pathname
  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Employee Dashboard";
    if (pathname.includes("/attendance")) return "Attendance Records";
    if (pathname.includes("/tasks")) return "My Tasks";
    if (pathname.includes("/announcements")) return "Company Announcements";
    if (pathname.includes("/leave")) return "Leave Requests";
    if (pathname.includes("/profile")) return "Personal Information";
    if (pathname.includes("/change-password")) return "Change Password";
    return "Employee Portal";
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      {/* Fixed Sidebar for desktop, off-canvas for mobile */}
      <Sidebar role="employee" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Topbar
          title={getPageTitle()}
          setMobileOpen={setMobileOpen}
          role="employee"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
