"use client";

import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import { usePathname } from "next/navigation";

export default function ManagerLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Manager Dashboard";
    if (pathname.includes("/employees")) return "Department Employees";
    if (pathname.includes("/attendance")) return "Department Attendance";
    if (pathname.includes("/tasks")) return "Task Management";
    if (pathname.includes("/leave-approvals")) return "Leave Approvals";
    if (pathname.includes("/announcements")) return "Manage Announcements";
    if (pathname.includes("/profile")) return "Personal Information";
    if (pathname.includes("/change-password")) return "Change Password";
    return "Department Manager Portal";
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      {/* Off-canvas mobile navigation eliminating horizontal page overflow (D-04) */}
      <Sidebar role="manager" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Topbar
          title={getPageTitle()}
          setMobileOpen={setMobileOpen}
          role="manager"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
