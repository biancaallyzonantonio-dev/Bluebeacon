"use client";

import { useState } from "react";
import { useEMS } from "@/context/EMSContext";
import {
  Megaphone,
  Search,
  CheckCircle2,
  Calendar,
  User,
  Users,
  X,
  Sparkles,
  ArrowRight,
  Filter
} from "lucide-react";

export default function EmployeeAnnouncementsPage() {
  const { currentUser, announcements, acknowledgeAnnouncement } = useEMS();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest', 'oldest', 'category'

  // Modal details
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  const categories = ["All", "General", "Company Policy", "Events & Culture", "System Updates"];

  const featuredAnnouncement = announcements.find(a => a.isFeatured);

  // Filter announcements (Test E-32)
  let filtered = announcements.filter(a => {
    if (selectedCategory !== "All" && a.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort announcements (Test E-31)
  filtered.sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.effectiveDate) - new Date(b.effectiveDate);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return new Date(b.effectiveDate) - new Date(a.effectiveDate); // newest first
  });

  const handleOpenDetails = (ann) => {
    setActiveAnnouncement(ann);
  };

  const handleAcknowledge = (id) => {
    acknowledgeAnnouncement(id);
    if (activeAnnouncement?.id === id) {
      setActiveAnnouncement({
        ...activeAnnouncement,
        acknowledgedBy: [...(activeAnnouncement.acknowledgedBy || []), currentUser?.id || "EMP-001"]
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0E2148] tracking-tight">
          Company Announcements
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Stay informed with corporate memos, official schedules, and confirm notice receipt.
        </p>
      </div>

      {/* Featured Pinned Announcement (Test E-30) */}
      {featuredAnnouncement && (
        <div className="bg-gradient-to-r from-[#0E2148] to-[#1E3A8A] rounded-2xl p-6 sm:p-8 text-white card-shadow relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> Pinned Announcement
            </span>
            <span className="text-xs text-blue-200">
              Effective: {featuredAnnouncement.effectiveDate}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
            {featuredAnnouncement.title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed mb-6 line-clamp-3">
            {featuredAnnouncement.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenDetails(featuredAnnouncement)}
              className="px-4 py-2.5 rounded-xl bg-white text-[#0E2148] hover:bg-blue-50 font-bold text-xs tracking-wider shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-blue-200">
              Audience: {featuredAnnouncement.audience}
            </span>
          </div>
        </div>
      )}

      {/* Toolbar: Category Pills & Search & Sort (Test E-31, E-32) */}
      <div className="space-y-4">
        {/* Category Pills (Click to filter list, Test E-32) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? announcements.length
                : announcements.filter(a => a.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#1644FE] text-white shadow-md shadow-blue-900/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 max-w-md flex items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-blue-400">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcement by keyword..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#0E2148] outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 p-8">
            <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No announcements matching the selected filter.</p>
          </div>
        ) : (
          filtered.map((ann) => {
            const isAcknowledged = ann.acknowledgedBy?.includes(currentUser?.id || "EMP-001");

            return (
              <div
                key={ann.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 card-shadow flex flex-col justify-between hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1644FE] font-bold text-[10px] tracking-wide uppercase border border-blue-100">
                      {ann.category}
                    </span>
                    {!isAcknowledged && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold text-[10px] tracking-wider uppercase border border-rose-200">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-[#0E2148] mb-1.5 leading-snug">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {ann.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ann.effectiveDate}</span>
                  </div>

                  <button
                    onClick={() => handleOpenDetails(ann)}
                    className="font-semibold text-[#1644FE] hover:underline flex items-center gap-1"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Announcement Details Modal (Test E-33) */}
      {activeAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  {activeAnnouncement.id} · {activeAnnouncement.category}
                </span>
                <h3 className="text-base font-bold text-[#0E2148] leading-tight">
                  {activeAnnouncement.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveAnnouncement(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metadata Chips */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Author</span>
                <span className="font-semibold text-slate-700">{activeAnnouncement.author}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Effective Date</span>
                <span className="font-mono text-slate-700">{activeAnnouncement.effectiveDate}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Audience</span>
                <span className="font-semibold text-slate-700">{activeAnnouncement.audience}</span>
              </div>
            </div>

            {/* Full Body */}
            <div className="space-y-3 mb-6 text-xs text-slate-700 leading-relaxed">
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Description:</h5>
                <p className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  {activeAnnouncement.description}
                </p>
              </div>

              {activeAnnouncement.expectedImpact && (
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Expected Impact:</h5>
                  <p className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900">
                    {activeAnnouncement.expectedImpact}
                  </p>
                </div>
              )}
            </div>

            {/* Actions: Acknowledge & Close (Test E-33) */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              {activeAnnouncement.acknowledgedBy?.includes(currentUser?.id || "EMP-001") ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acknowledged</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAcknowledge(activeAnnouncement.id)}
                  className="py-2.5 px-5 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-xs tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acknowledge</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveAnnouncement(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs tracking-wider transition-colors"
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
