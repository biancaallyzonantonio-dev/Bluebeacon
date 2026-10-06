"use client";

import { useState } from "react";
import { useEMS } from "@/context/EMSContext";
import { calculateWorkingDays, isAtLeastTwoDaysAhead } from "@/lib/utils";
import StatCard from "@/components/common/StatCard";
import StatusPill from "@/components/common/StatusPill";
import {
  CalendarOff,
  Plus,
  Clock,
  X,
  Calendar,
  AlertCircle,
  FileText,
  Upload,
  CheckCircle2,
  Trash2
} from "lucide-react";

export default function EmployeeLeavePage() {
  const { currentUser, leaves, fileLeaveRequest, cancelLeaveRequest, anchorDate } = useEMS();

  // Filters
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Panel States
  const [showNewRequestPanel, setShowNewRequestPanel] = useState(false);
  const [activeLeaveDetails, setActiveLeaveDetails] = useState(null);

  // Form Fields
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState("");

  // Validation Errors (Procedure 7.8 / Test E-40)
  const [typeError, setTypeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [formGeneralError, setFormGeneralError] = useState("");

  const userLeaves = leaves.filter(
    l => l.employeeId === (currentUser?.id || "EMP-001")
  );

  // Filter by year (Test E-36)
  const yearFilteredLeaves = userLeaves.filter(l => {
    if (selectedYear === "all") return true;
    if (selectedYear === "2025-2026") {
      return l.startDate.startsWith("2025") || l.startDate.startsWith("2026");
    }
    return l.startDate.startsWith(selectedYear);
  });

  // Filter by status (Test E-35)
  const displayedLeaves = yearFilteredLeaves.filter(l => {
    if (selectedStatus === "All") return true;
    return l.status.toLowerCase() === selectedStatus.toLowerCase();
  });

  // Calculate working days dynamically (Test E-39)
  const computedDays = calculateWorkingDays(startDate, endDate);

  // Summary Metrics based on Year Filter (Test E-36)
  const totalYearRequests = yearFilteredLeaves.length;
  const approvedYearRequests = yearFilteredLeaves.filter(l => l.status === "Approved").length;
  const pendingYearRequests = yearFilteredLeaves.filter(l => l.status === "Pending").length;
  const rejectedYearRequests = yearFilteredLeaves.filter(l => l.status === "Rejected").length;

  const handleOpenNewRequest = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setAttachment("");
    setTypeError("");
    setDateError("");
    setReasonError("");
    setFormGeneralError("");
    setShowNewRequestPanel(true);
  };

  const handleSubmitLeave = (e) => {
    e.preventDefault();
    setTypeError("");
    setDateError("");
    setReasonError("");
    setFormGeneralError("");

    let hasError = false;

    if (!leaveType) {
      setTypeError("Please select a leave type.");
      hasError = true;
    }

    if (!startDate || !endDate) {
      setDateError("Please select your start and end date.");
      hasError = true;
    } else if (new Date(startDate) > new Date(endDate)) {
      setDateError("Start date cannot be after end date.");
      hasError = true;
    } else if (!isAtLeastTwoDaysAhead(startDate, anchorDate)) {
      setDateError("Leave filing requires at least 2 days advance notice.");
      hasError = true;
    }

    if (!reason.trim()) {
      setReasonError("Please enter a reason for your leave.");
      hasError = true;
    } else if (reason.trim().length > 500) {
      setReasonError("Reason must not exceed 500 characters.");
      hasError = true;
    }

    if (hasError) {
      setFormGeneralError("Can't submit. Please fill the required requirements.");
      return;
    }

    // Submit valid request (Test E-41)
    fileLeaveRequest({
      leaveType,
      startDate,
      endDate,
      reason: reason.trim(),
      attachment
    });

    setShowNewRequestPanel(false);
  };

  const handleCancelPending = (leaveId) => {
    cancelLeaveRequest(leaveId);
    setActiveLeaveDetails(null);
  };

  // Min selectable date: Anchor Date (July 13, 2026) + 2 days = July 15, 2026 (Test E-38)
  const minFilingDate = "2026-07-15";

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0E2148] tracking-tight">
            Leave Requests
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            File planned leaves at least 2 days in advance and monitor department approval decisions.
          </p>
        </div>

        <button
          onClick={handleOpenNewRequest}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-xs tracking-wider shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>NEW REQUEST</span>
        </button>
      </div>

      {/* Summary Cards by Year (Test E-36) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Requests" value={totalYearRequests} color="blue" />
        <StatCard title="Approved" value={approvedYearRequests} color="emerald" />
        <StatCard title="Pending Review" value={pendingYearRequests} color="amber" />
        <StatCard title="Rejected" value={rejectedYearRequests} color="rose" />
      </div>

      {/* Filter Toolbar (Test E-35, E-36) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0E2148] outline-none"
            >
              <option value="2026">2026</option>
              <option value="2025-2026">2025 - 2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0E2148] outline-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {displayedLeaves.length} record(s)
        </div>
      </div>

      {/* Leave Request History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden card-shadow">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-sm text-[#0E2148]">Leave Request History</h3>
          <span className="text-xs text-slate-500">Standard notice policy: 2 days</span>
        </div>

        {displayedLeaves.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <CalendarOff className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No leave requests found for selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-[#E8EEFA] text-[#0E2148] font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Days</th>
                  <th className="py-3 px-4">Filing Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedLeaves.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0E2148]">
                      {req.leaveType} Leave
                      {req.attachment && (
                        <span className="block text-[10px] text-blue-600 font-medium">
                          📎 Attachment included
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {req.startDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {req.endDate}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {req.workingDays} day(s)
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {req.filedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusPill status={req.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveLeaveDetails(req)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#1644FE] hover:text-white font-semibold text-xs text-slate-700 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-Over Panel: New Leave Request (Procedure 7.8, Figure 24 / Tests E-37 to E-41) */}
      {showNewRequestPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          <div
            onClick={() => setShowNewRequestPanel(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-bold text-[#0E2148]">New Leave Request</h3>
                  <p className="text-xs text-slate-500">File leave at least 2 days in advance</p>
                </div>
                <button
                  onClick={() => setShowNewRequestPanel(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmitLeave} className="p-6 space-y-4 flex-1" noValidate>
                {/* General error banner (Test E-40) */}
                {formGeneralError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formGeneralError}</span>
                  </div>
                )}

                {/* 1. Leave Type (Test E-37) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Leave Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => {
                      setLeaveType(e.target.value);
                      if (typeError) setTypeError("");
                    }}
                    className={`w-full bg-[#F8FAFC] border rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium outline-none transition-all ${
                      typeError
                        ? "border-rose-500 ring-2 ring-rose-100"
                        : "border-slate-300 focus:border-[#1644FE]"
                    }`}
                  >
                    <option value="">Select leave type</option>
                    <option value="Vacation">Vacation Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Birthday">Birthday Leave</option>
                    <option value="Emergency">Emergency Leave</option>
                    <option value="Maternity">Maternity Leave</option>
                    <option value="Paternity">Paternity Leave</option>
                  </select>
                  {typeError && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{typeError}</p>
                  )}
                </div>

                {/* 2. Dates with 2-day policy enforcement (Test E-38) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Start Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={minFilingDate}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (dateError) setDateError("");
                      }}
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none ${
                        dateError
                          ? "border-rose-500 ring-2 ring-rose-100"
                          : "border-slate-300 focus:border-[#1644FE]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      End Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={startDate || minFilingDate}
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        if (dateError) setDateError("");
                      }}
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none ${
                        dateError
                          ? "border-rose-500 ring-2 ring-rose-100"
                          : "border-slate-300 focus:border-[#1644FE]"
                      }`}
                    />
                  </div>
                </div>
                {dateError && (
                  <p className="text-xs text-rose-600 font-medium">{dateError}</p>
                )}

                {/* 3. Number of Days calculated automatically (Test E-39) */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 block">Number of Days:</span>
                    <span className="text-[10px] text-slate-400">Excludes Saturday and Sunday</span>
                  </div>
                  <span className="text-lg font-bold text-[#1644FE]">
                    {computedDays} day(s)
                  </span>
                </div>

                {/* 4. Reason (Max 500 chars) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Reason <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400">
                      {reason.length}/500 chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      if (reasonError) setReasonError("");
                    }}
                    placeholder="Enter detailed reason for leave..."
                    className={`w-full bg-[#F8FAFC] border rounded-xl p-3 text-xs text-slate-900 outline-none leading-relaxed ${
                      reasonError
                        ? "border-rose-500 ring-2 ring-rose-100"
                        : "border-slate-300 focus:border-[#1644FE]"
                    }`}
                  />
                  {reasonError && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{reasonError}</p>
                  )}
                </div>

                {/* 5. Optional Attachment (PDF, JPG, PNG up to 5MB) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Supporting Attachment (Optional, max 5MB)
                  </label>
                  <label className="border border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer text-xs text-slate-600 transition-colors">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>{attachment ? attachment : "Upload document (PDF, PNG, JPG)"}</span>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setAttachment(file.name);
                      }}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-xs tracking-wider shadow-md transition-all text-center"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewRequestPanel(false)}
                    className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs tracking-wider transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Leave Details Modal & Cancel Action (Test E-42) */}
      {activeLeaveDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold text-blue-600">
                    {activeLeaveDetails.id}
                  </span>
                  <StatusPill status={activeLeaveDetails.status} />
                </div>
                <h3 className="text-base font-bold text-[#0E2148]">
                  {activeLeaveDetails.leaveType} Leave Request
                </h3>
              </div>
              <button
                onClick={() => setActiveLeaveDetails(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Dates</span>
                  <span className="font-mono text-slate-800">{activeLeaveDetails.startDate} to {activeLeaveDetails.endDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Duration</span>
                  <span className="font-bold text-[#1644FE]">{activeLeaveDetails.workingDays} working day(s)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Filing Date</span>
                  <span className="font-mono text-slate-600">{activeLeaveDetails.filedDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Attachment</span>
                  <span className="text-slate-600">{activeLeaveDetails.attachment || "None"}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">Reason:</span>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  {activeLeaveDetails.reason}
                </p>
              </div>

              {activeLeaveDetails.managerNote && (
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Manager Note:</span>
                  <p className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 text-blue-900 leading-relaxed">
                    {activeLeaveDetails.managerNote}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              {activeLeaveDetails.status === "Pending" && (
                <button
                  type="button"
                  onClick={() => handleCancelPending(activeLeaveDetails.id)}
                  className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel Request</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveLeaveDetails(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs tracking-wider transition-colors ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
