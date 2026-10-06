"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import StatCard from "@/components/common/StatCard";
import StatusPill from "@/components/common/StatusPill";
import { CheckSquare, CalendarCheck, CalendarOff, Megaphone, ArrowRight, Clock, ExternalLink } from "lucide-react";

export default function EmployeeDashboardPage() {
  const router = useRouter();
  const { currentUser, tasks, attendance, announcements } = useEMS();

  const userTasks = tasks.filter(t => t.assignedTo === (currentUser?.id || "EMP-001"));
  const activeTasks = userTasks.filter(t => t.status === "In Progress");
  const pendingTasks = userTasks.filter(t => t.status === "In Progress" || t.status === "Waiting Review");

  // Attendance snapshot for July 2026
  const userJulyAttendance = attendance.filter(
    a => a.employeeId === (currentUser?.id || "EMP-001") && a.date.startsWith("2026-07")
  );
  const daysPresent = userJulyAttendance.filter(a => a.status === "Present" || a.status === "Late").length;

  // Latest announcement
  const latestAnnouncement = announcements.find(a => a.isFeatured) || announcements[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0E2148] to-[#1644FE] rounded-2xl p-6 sm:p-8 text-white card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-blue-200 font-semibold text-xs inline-block mb-2">
            Employee Operations Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {currentUser?.shortName || "Bia"}!
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Here is your daily snapshot for Monday, July 13, 2026. You have {activeTasks.length} active tasks in progress today.
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0">
          <Link
            href="/employee/tasks"
            className="px-4 py-2.5 rounded-xl bg-white text-[#0E2148] font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm text-center flex items-center justify-center gap-1.5"
          >
            <span>My Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/employee/leave"
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors text-center"
          >
            File Leave
          </Link>
        </div>
      </div>

      {/* Snapshot Metric Cards (Procedure 7.4, Test E-14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Tasks"
          value={activeTasks.length}
          subtitle={`${pendingTasks.length} total open tasks`}
          icon={CheckSquare}
          color="blue"
          onClick={() => router.push("/employee/tasks")}
        />
        <StatCard
          title="Days Present This Month"
          value={daysPresent}
          subtitle="July 2026 attendance"
          icon={CalendarCheck}
          color="emerald"
          onClick={() => router.push("/employee/attendance")}
        />
        <StatCard
          title="Vacation Credits"
          value={`${currentUser?.leaveBalances?.vacation ?? 9} Days`}
          subtitle="Remaining balance"
          icon={CalendarOff}
          color="indigo"
          onClick={() => router.push("/employee/leave")}
        />
        <StatCard
          title="Announcements"
          value={announcements.length}
          subtitle="1 featured bulletin"
          icon={Megaphone}
          color="amber"
          onClick={() => router.push("/employee/announcements")}
        />
      </div>

      {/* Two Column Section: Currently Working On & Latest Announcement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Currently Working On (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-[#1644FE]">
                  <CheckSquare className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2148]">Currently Working On</h3>
                  <p className="text-xs text-slate-500">Tasks in progress assigned to you</p>
                </div>
              </div>
              <Link
                href="/employee/tasks"
                className="text-xs font-semibold text-[#1644FE] hover:underline flex items-center gap-1"
              >
                View All Tasks <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {activeTasks.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No active tasks right now. Great job!
                </div>
              ) : (
                activeTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => router.push("/employee/tasks")}
                    className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-400/60 hover:bg-blue-50/20 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          {task.id} · Priority: {task.priority}
                        </span>
                        <h4 className="font-bold text-sm text-[#0E2148] hover:text-[#1644FE] transition-colors">
                          {task.name}
                        </h4>
                      </div>
                      <StatusPill status={task.status} />
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <span className="font-semibold text-slate-700">{task.progress}% Complete</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-[#1644FE] h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Latest Announcement Bulletin */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Megaphone className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2148]">Latest Announcement</h3>
                  <p className="text-xs text-slate-500">Company official notices</p>
                </div>
              </div>
            </div>

            {latestAnnouncement && (
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60">
                {latestAnnouncement.isFeatured && (
                  <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold tracking-wider uppercase mb-2">
                    Pinned Bulletin
                  </span>
                )}
                <h4 className="font-bold text-sm text-[#0E2148] mb-1.5 leading-snug">
                  {latestAnnouncement.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                  {latestAnnouncement.description}
                </p>
                <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-amber-200/40 pt-2.5">
                  <span>Effective: {latestAnnouncement.effectiveDate}</span>
                  <span>{latestAnnouncement.category}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/employee/announcements"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E2148] font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View All Announcements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
