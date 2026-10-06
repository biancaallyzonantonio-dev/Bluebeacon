"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import Link from "next/link";
import { ShieldCheck, UserCheck, ArrowRight, Building2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { currentUser, isInitialized, switchDemoUser } = useEMS();

  useEffect(() => {
    if (!isInitialized) return;
    if (currentUser) {
      if (currentUser.role === "manager") {
        router.push("/manager/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    } else {
      router.push("/login");
    }
  }, [currentUser, isInitialized, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F8FC] p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 text-center">
        {/* Brand Header */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0E2148] text-white mb-6 shadow-md shadow-[#0E2148]/10">
          <Building2 className="w-8 h-8 text-[#1644FE]" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#0E2148] tracking-tight mb-2">
          BlueBeacon Employee Management System
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Enterprise portal for Employee Operations and Department Management (SOP-EMS-001)
        </p>

        {/* Quick Portal Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          <button
            onClick={() => {
              switchDemoUser("employee");
              router.push("/employee/dashboard");
            }}
            className="group p-5 rounded-xl border border-slate-200 hover:border-[#1644FE] bg-slate-50/50 hover:bg-blue-50/30 transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-lg bg-blue-100 text-[#1644FE]">
                  <UserCheck className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  Employee Portal
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm group-hover:text-[#1644FE] transition-colors">
                Bianca Antonio
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Web Designer (EMP-001)</p>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-[#1644FE]">
              Enter as Employee <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => {
              switchDemoUser("manager");
              router.push("/manager/dashboard");
            }}
            className="group p-5 rounded-xl border border-slate-200 hover:border-[#0E2148] bg-slate-50/50 hover:bg-slate-100/50 transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                  Manager Portal
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm group-hover:text-[#0E2148] transition-colors">
                Andrei Vance
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Creative Director (MGR-001)</p>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-[#0E2148]">
              Enter as Manager <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Standard Authentication Gateway */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Standard Corporate Login:</span>
          <Link
            href="/login"
            className="font-medium text-[#1644FE] hover:underline flex items-center gap-1"
          >
            Go to Login Page <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
