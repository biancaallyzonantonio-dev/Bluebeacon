"use client";

import React from "react";

/**
 * Standardized Status Pill (Harmonized across Employee and Manager portals)
 * Resolves Defect D-17
 */
export default function StatusPill({ status }) {
  const norm = (status || "").toLowerCase();

  let styles = "bg-slate-100 text-slate-700 border-slate-200";

  // Green / Emerald
  if (norm === "approved" || norm === "present" || norm === "completed") {
    styles = "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
  }
  // Amber / Orange
  else if (
    norm === "pending" ||
    norm === "late" ||
    norm === "in progress" ||
    norm === "waiting review"
  ) {
    styles = "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
  }
  // Red / Rose
  else if (norm === "rejected" || norm === "absent" || norm === "overdue") {
    styles = "bg-rose-50 text-rose-700 border-rose-200 font-semibold";
  }
  // Indigo / Purple
  else if (norm === "assigned" || norm === "on leave" || norm === "featured") {
    styles = "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border tracking-wide select-none ${styles}`}
    >
      {status}
    </span>
  );
}
