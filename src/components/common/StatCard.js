"use client";

import React from "react";

export default function StatCard({ title, value, icon: Icon, color = "blue", subtitle, onClick }) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-[#1644FE]",
      border: "hover:border-[#1644FE]"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "hover:border-emerald-500"
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "hover:border-amber-500"
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "hover:border-rose-500"
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "hover:border-indigo-500"
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 card-shadow transition-all ${
        onClick ? `cursor-pointer ${scheme.border} hover:shadow-md hover:-translate-y-0.5` : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${scheme.bg} ${scheme.text}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-[#0E2148] tracking-tight">
        {value}
      </div>
      {subtitle && (
        <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
      )}
    </div>
  );
}
