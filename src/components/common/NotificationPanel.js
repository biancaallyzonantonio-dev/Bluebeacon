"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import { Bell, CheckCheck, Trash2, ExternalLink } from "lucide-react";

export default function NotificationPanel({ align = "right" }) {
  const router = useRouter();
  const { currentUser, notifications, markNotificationAsRead, markAllNotificationsAsRead, clearAllNotifications } = useEMS();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Filter for notifications belonging to active user
  const userNotifications = notifications.filter(
    n => n.userId === (currentUser?.id || "EMP-001")
  );
  const unreadCount = userNotifications.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    markNotificationAsRead(item.id);
    setIsOpen(false);
    if (item.link && item.link !== "#") {
      router.push(item.link);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-50 overflow-hidden animate-fadeIn ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#0E2148]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#1644FE] font-bold text-[11px]">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-[11px] font-semibold text-[#1644FE] hover:underline flex items-center gap-1"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              )}
              {userNotifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-0.5"
                  title="Clear all notifications"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {userNotifications.length === 0 ? (
              <div className="py-10 px-4 text-center text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs">No notifications right now.</p>
              </div>
            ) : (
              userNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`p-3.5 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-start gap-3 ${
                    !notif.read ? "bg-blue-50/20" : ""
                  }`}
                >
                  {/* Unread indicator dot */}
                  <div className="mt-1 shrink-0">
                    {!notif.read ? (
                      <span className="w-2 h-2 rounded-full bg-[#1644FE] block" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300 block opacity-40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs font-semibold truncate ${!notif.read ? "text-[#0E2148]" : "text-slate-600"}`}>
                        {notif.title}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 opacity-60" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
