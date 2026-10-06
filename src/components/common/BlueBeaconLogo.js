"use client";

import React from "react";

export default function BlueBeaconLogo({ className = "", light = true, size = "default" }) {
  const textColor = light ? "text-white" : "text-[#0E2148]";
  const iconHeight = size === "small" ? "h-6" : size === "large" ? "h-10" : "h-8";
  const fontSize = size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* BlueBeacon Emblem */}
      <svg
        className={`${iconHeight} w-auto`}
        viewBox="0 0 44 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Beacon light cone projection */}
        <path
          d="M20 16L42 7V29L20 20V16Z"
          fill="url(#beaconLightGrad)"
          opacity="0.9"
        />
        {/* Lighthouse Tower / Stylized B */}
        <path
          d="M6 34H22V30H19L18 12C18 9 15 7 12 7H6V34Z"
          fill="url(#towerGrad)"
        />
        {/* Tower Stripes / details */}
        <rect x="8" y="15" width="8" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.8" />
        <rect x="8" y="23" width="9" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.8" />
        {/* Lighthouse Lantern / Dome */}
        <path
          d="M9 7C9 4.79 10.79 3 13 3C15.21 3 17 4.79 17 7H9Z"
          fill="#38BDF8"
        />
        <circle cx="13" cy="7" r="2.5" fill="#FFFFFF" />
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="towerGrad" x1="6" y1="3" x2="22" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="beaconLightGrad" x1="20" y1="18" x2="42" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" stopOpacity="0.95" />
            <stop offset="1" stopColor="#93C5FD" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Wordmark */}
      <span className={`font-black tracking-wider ${fontSize} ${textColor} uppercase font-sans`}>
        BLUEBEACON
      </span>
    </div>
  );
}
