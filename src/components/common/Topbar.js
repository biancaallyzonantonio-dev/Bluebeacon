"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import NotificationPanel from "@/components/common/NotificationPanel";
import { Menu, ChevronDown, User, KeyRound, LogOut, Calendar } from "lucide-react";

export default function Topbar({ title = "Dashboard", setMobileOpen, role = "employee" }) {
  const router = useRouter();
  const { currentUser, logout, anchorDate } = useEMS();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const profileLink = role === "manager" ? "/manager/profile" : "/employee/profile";
  const passwordLink = role === "manager" ? "/manager/change-password" : "/employee/change-password";

  return (
    <header className="h-18 bg-white border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 card-shadow">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg sm:text-xl font-bold text-[#0E2148] tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right Controls: Anchor Date, Notifications, Profile Menu */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Simulation Date Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Jul 13, 2026</span>
        </div>

        {/* Notifications Dropdown (Resolves D-05, E-15, E-16) */}
        <NotificationPanel align="right" />

        {/* Profile Chip & Dropdown Menu (Resolves D-06, E-17) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="User Profile Menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 border border-blue-200 shrink-0 flex items-center justify-center font-bold text-xs text-[#1644FE]">
              {currentUser?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                currentUser?.shortName?.[0] || "U"
              )}
            </div>

            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-[#0E2148] leading-tight">
                {currentUser?.shortName || currentUser?.name || "User"}
              </span>
              <span className="block text-[11px] text-slate-500 capitalize leading-tight">
                {currentUser?.position || (role === "manager" ? "Dept Manager" : "Employee")}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                <p className="text-xs font-bold text-[#0E2148]">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
              </div>

              <Link
                href={profileLink}
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50/50 hover:text-[#1644FE] font-medium transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </Link>

              <Link
                href={passwordLink}
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50/50 hover:text-[#1644FE] font-medium transition-colors"
              >
                <KeyRound className="w-4 h-4 text-slate-400" />
                <span>Change Password</span>
              </Link>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
