"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import StatCard from "@/components/common/StatCard";
import StatusPill from "@/components/common/StatusPill";
import {
  Users,
  CalendarCheck,
  CheckSquare,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  CalendarOff
} from "lucide-react";

export default function ManagerDashboardPage() {
  const router = useRouter();
  const { currentUser, users, tasks, leaves, attendance, approveLeaveRequest, rejectLeaveRequest } = useEMS();

  const deptEmployees = users.filter(u => u.role === "employee" && u.isActivated);
  const pendingLeaves = leaves.filter(l => l.status === "Pending");
  const waitingTasks = tasks.filter(t => t.status === "Waiting Review");
  const overdueTasks = tasks.filter(t => t.status === "Overdue");

  // July 13 today's present count
  const todayAttendance = attendance.filter(a => a.date === "2026-07-13");
  const presentToday = todayAttendance.filter(a => a.status === "Present" || a.status === "Late").length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0E2148] to-[#1E3A8A] rounded-2xl p-6 sm:p-8 text-white card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-200 font-semibold text-xs inline-block mb-2">
            Department Manager Portal · Design & Marketing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {currentUser?.shortName || "Andrei"}!
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            You have {pendingLeaves.length} leave requests and {waitingTasks.length} tasks waiting for your review today.
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0">
          <Link
            href="/manager/tasks"
            className="px-4 py-2.5 rounded-xl bg-white text-[#0E2148] font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm text-center flex items-center justify-center gap-1.5"
          >
            <span>Task Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/manager/leave-approvals"
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors text-center"
          >
            Leave Approvals ({pendingLeaves.length})
          </Link>
        </div>
      </div>

      {/* Snapshot Cards (Procedure 8.1, Test M-02) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Staff"
          value={deptEmployees.length}
          subtitle="Design & Marketing team"
          icon={Users}
          color="blue"
          onClick={() => router.push("/manager/employees")}
        />
        <StatCard
          title="Present Today"
          value={presentToday}
          subtitle="July 13, 2026 logs"
          icon={CalendarCheck}
          color="emerald"
          onClick={() => router.push("/manager/attendance")}
        />
        <StatCard
          title="Waiting Review"
          value={waitingTasks.length}
          subtitle="Submitted tasks"
          icon={CheckSquare}
          color="amber"
          onClick={() => router.push("/manager/tasks")}
        />
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks.length}
          subtitle="Requires attention"
          icon={AlertCircle}
          color="rose"
          onClick={() => router.push("/manager/tasks")}
        />
      </div>

      {/* Needs Your Approval Section (Procedure 8.1 / Test M-05) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <CalendarOff className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-[#0E2148]">Needs Your Approval</h3>
              <p className="text-xs text-slate-500">Pending employee leave requests requiring policy sign-off</p>
            </div>
          </div>
          <Link
            href="/manager/leave-approvals"
            className="text-xs font-semibold text-[#1644FE] hover:underline flex items-center gap-1"
          >
            View All Approvals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingLeaves.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No pending leave requests at this time. All caught up!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Inclusive Dates</th>
                  <th className="py-3 px-4">Days</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingLeaves.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0E2148]">
                      {req.employeeName}
                      <span className="block text-[10px] font-normal text-slate-400">{req.position}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1644FE] font-medium border border-blue-100">
                        {req.leaveType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {req.startDate} to {req.endDate}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {req.workingDays} day(s)
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {req.reason}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => approveLeaveRequest(req.id, "Approved from dashboard queue.")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs border border-emerald-200 transition-colors flex items-center gap-1"
                          title="Approve"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => rejectLeaveRequest(req.id, "Declined from dashboard queue.")}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors flex items-center gap-1"
                          title="Reject"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Two Column: Tasks Waiting on You & Department Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Waiting On You (Test M-06) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#0E2148] flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              Tasks Waiting On You
            </h3>
            <Link
              href="/manager/tasks"
              className="text-xs font-semibold text-[#1644FE] hover:underline"
            >
              Manage Tasks →
            </Link>
          </div>

          <div className="space-y-3">
            {waitingTasks.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No tasks awaiting review.</p>
            ) : (
              waitingTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => router.push("/manager/tasks")}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-semibold text-xs text-[#0E2148]">{task.name}</h4>
                    <p className="text-[11px] text-slate-500">Submitted by: {task.assigneeName}</p>
                  </div>
                  <StatusPill status={task.status} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links & Department Roster preview */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#0E2148] flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Department Team Members
              </h3>
              <Link
                href="/manager/employees"
                className="text-xs font-semibold text-[#1644FE] hover:underline"
              >
                View Roster →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {deptEmployees.slice(0, 6).map((emp) => (
                <div key={emp.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-800 truncate">{emp.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{emp.position}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>SOP-EMS-001 Rev 1.1</span>
            <span className="font-semibold text-blue-600">Active Build v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
