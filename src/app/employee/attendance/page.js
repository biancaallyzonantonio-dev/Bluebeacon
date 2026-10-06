"use client";

import { useState } from "react";
import { useEMS } from "@/context/EMSContext";
import { exportToCSV } from "@/lib/utils";
import StatCard from "@/components/common/StatCard";
import StatusPill from "@/components/common/StatusPill";
import { Download, Calendar, Filter, Clock } from "lucide-react";

export default function EmployeeAttendancePage() {
  const { currentUser, attendance } = useEMS();

  // Filters
  const [selectedMonth, setSelectedMonth] = useState("2026-05"); // Default to May 2026 to verify E-18
  const [selectedStatus, setSelectedStatus] = useState("All");

  const userRecords = attendance.filter(
    a => a.employeeId === (currentUser?.id || "EMP-001")
  );

  // Filtered by selected month
  const monthRecords = userRecords.filter(a => a.date.startsWith(selectedMonth));

  // Compute stat card counts based on current month (Procedure 7.5 / Test E-18)
  const totalCount = monthRecords.length;
  const presentCount = monthRecords.filter(a => a.status === "Present").length;
  const lateCount = monthRecords.filter(a => a.status === "Late").length;
  const absentCount = monthRecords.filter(a => a.status === "Absent").length;

  // Filtered by status
  const displayedRecords = monthRecords.filter(a => {
    if (selectedStatus === "All") return true;
    return a.status.toLowerCase() === selectedStatus.toLowerCase();
  });

  const handleExportCSV = () => {
    const filename = `attendance-${selectedMonth}.csv`;
    const exportData = displayedRecords.map(r => ({
      Date: r.date,
      "Employee ID": r.employeeId,
      "Employee Name": r.employeeName,
      "Time In": r.timeIn,
      "Time Out": r.timeOut,
      Status: r.status,
      "Hours Worked": r.hoursWorked
    }));
    exportToCSV(exportData, filename);
  };

  const monthOptions = [
    { label: "May 2026", value: "2026-05" },
    { label: "June 2026", value: "2026-06" },
    { label: "July 2026", value: "2026-07" },
    { label: "August 2026", value: "2026-08" },
    { label: "September 2026", value: "2026-09" }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0E2148] tracking-tight">
            Attendance Records
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review your daily punch logs, monthly attendance summaries, and export records.
          </p>
        </div>

        {/* Export Button (Test E-21) */}
        <button
          onClick={handleExportCSV}
          disabled={displayedRecords.length === 0}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] disabled:opacity-50 text-white font-bold text-xs tracking-wider shadow-md transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* Summary Cards (Procedure 7.5 / Test E-18) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Days" value={totalCount} color="blue" />
        <StatCard title="Present" value={presentCount} color="emerald" />
        <StatCard title="Late" value={lateCount} color="amber" />
        <StatCard title="Absent" value={absentCount} color="rose" />
      </div>

      {/* Filter Toolbar (Procedure 7.5, Figures 15 & 16) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Month:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0E2148] outline-none focus:border-[#1644FE]"
            >
              {monthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0E2148] outline-none focus:border-[#1644FE]"
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {displayedRecords.length} record(s)
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden card-shadow">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-sm text-[#0E2148]">Attendance History</h3>
          <span className="text-xs text-slate-500">Working hours: 9:00 AM - 6:00 PM</span>
        </div>

        {displayedRecords.length === 0 ? (
          /* Empty Month State (Test E-22) */
          <div className="py-16 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">
              No attendance records for{" "}
              {monthOptions.find(m => m.value === selectedMonth)?.label || selectedMonth}.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-[#E8EEFA] text-[#0E2148] font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time In</th>
                  <th className="py-3 px-4">Time Out</th>
                  <th className="py-3 px-4">Hours</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                      {rec.date}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {rec.timeIn}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {rec.timeOut}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {rec.hoursWorked} hrs
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusPill status={rec.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
