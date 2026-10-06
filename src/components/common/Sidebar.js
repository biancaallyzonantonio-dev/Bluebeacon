"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import BlueBeaconLogo from "@/components/common/BlueBeaconLogo";
import {
  LayoutDashboard,
  CalendarCheck,
  CheckSquare,
  Megaphone,
  CalendarOff,
  User,
  KeyRound,
  LogOut,
  Search,
  Users,
  ShieldCheck,
  UserCheck,
  X,
  Menu
} from "lucide-react";

export default function Sidebar({ role = "employee", mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, switchDemoUser, leaves, tasks, announcements } = useEMS();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Count pending leave requests for Manager badge
  const pendingLeavesCount = leaves.filter(l => l.status === "Pending").length;

  const employeeLinks = [
    { label: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { label: "Attendance", href: "/employee/attendance", icon: CalendarCheck },
    { label: "My Tasks", href: "/employee/tasks", icon: CheckSquare },
    { label: "Announcement", href: "/employee/announcements", icon: Megaphone },
    { label: "Leave Request", href: "/employee/leave", icon: CalendarOff },
    { label: "Personal Information", href: "/employee/profile", icon: User },
    { label: "Change Password", href: "/employee/change-password", icon: KeyRound }
  ];

  const managerLinks = [
    { label: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
    { label: "Employees", href: "/manager/employees", icon: Users },
    { label: "Attendance", href: "/manager/attendance", icon: CalendarCheck },
    { label: "Task Management", href: "/manager/tasks", icon: CheckSquare },
    {
      label: "Leave Approvals",
      href: "/manager/leave-approvals",
      icon: CalendarOff,
      badge: pendingLeavesCount > 0 ? pendingLeavesCount : null
    },
    { label: "Announcement", href: "/manager/announcements", icon: Megaphone },
    { label: "Personal Information", href: "/manager/profile", icon: User },
    { label: "Change Password", href: "/manager/change-password", icon: KeyRound }
  ];

  const navLinks = role === "manager" ? managerLinks : employeeLinks;

  // Global search implementation (Procedure 7.4 / Test E-55 / M-36)
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const q = query.toLowerCase();
    const results = [];

    // Search tasks
    tasks.forEach(t => {
      if (t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)) {
        results.push({
          type: "Task",
          title: t.name,
          subtitle: `${t.id} · ${t.status}`,
          link: role === "manager" ? "/manager/tasks" : "/employee/tasks"
        });
      }
    });

    // Search announcements
    announcements.forEach(a => {
      if (a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) {
        results.push({
          type: "Announcement",
          title: a.title,
          subtitle: a.category,
          link: role === "manager" ? "/manager/announcements" : "/employee/announcements"
        });
      }
    });

    // Search leaves
    leaves.forEach(l => {
      if (
        l.reason?.toLowerCase().includes(q) ||
        l.leaveType?.toLowerCase().includes(q) ||
        l.employeeName?.toLowerCase().includes(q)
      ) {
        results.push({
          type: "Leave",
          title: `${l.leaveType} Leave - ${l.employeeName}`,
          subtitle: `${l.startDate} (${l.status})`,
          link: role === "manager" ? "/manager/leave-approvals" : "/employee/leave"
        });
      }
    });

    setSearchResults(results.slice(0, 6));
    setShowSearchResults(true);
  };

  const handleSelectSearchResult = (link) => {
    setShowSearchResults(false);
    setSearchQuery("");
    if (setMobileOpen) setMobileOpen(false);
    router.push(link);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchPortal = () => {
    if (role === "employee") {
      switchDemoUser("manager");
      router.push("/manager/dashboard");
    } else {
      switchDemoUser("employee");
      router.push("/employee/dashboard");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#0E2148] text-white flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <Link href={role === "manager" ? "/manager/dashboard" : "/employee/dashboard"}>
            <BlueBeaconLogo light={true} size="default" />
          </Link>
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Global Sidebar Search (Procedure 7.4, Test E-55) */}
        <div className="p-4 relative">
          <div className="flex items-center bg-[#172D5C] rounded-xl px-3 py-2 border border-blue-400/20 focus-within:border-blue-400/60 transition-colors">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-4 right-4 mt-1 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 z-50 max-h-64 overflow-y-auto divide-y divide-slate-100 animate-fadeIn">
              {searchResults.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400">
                  No matching items found.
                </div>
              ) : (
                searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSearchResult(item.link)}
                    className="p-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] font-bold text-[#1644FE] uppercase tracking-wider block">
                      {item.type}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 truncate">{item.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#1644FE] text-white shadow-md shadow-blue-900/30 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px] animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Portal Quick Switch Bar (Demo helper) */}
        <div className="p-3 mx-3 mb-2 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Role:
            </span>
            <span className="text-[11px] font-semibold text-blue-300 capitalize">
              {role}
            </span>
          </div>
          <button
            onClick={handleSwitchPortal}
            className="w-full py-1.5 px-2.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5"
          >
            {role === "employee" ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                Switch to Manager
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                Switch to Employee
              </>
            )}
          </button>
        </div>

        {/* Footer Logout (Procedure 7.3, Test E-54, M-35) */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
