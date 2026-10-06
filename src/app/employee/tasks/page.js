"use client";

import { useState } from "react";
import { useEMS } from "@/context/EMSContext";
import StatCard from "@/components/common/StatCard";
import StatusPill from "@/components/common/StatusPill";
import { downloadFile } from "@/lib/utils";
import {
  CheckSquare,
  Search,
  RotateCcw,
  Clock,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  Trash2,
  X,
  FileText,
  AlertCircle,
  ExternalLink,
  Download
} from "lucide-react";

export default function EmployeeTasksPage() {
  const { currentUser, tasks, updateTaskChecklist, submitTaskForReview } = useEMS();

  // Filters
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name' (A-Z) or 'dueDate'

  // Drawer state
  const [selectedTask, setSelectedTask] = useState(null);
  const [newProjectLink, setNewProjectLink] = useState("");
  const [showAddLinkInput, setShowAddLinkInput] = useState(false);

  const userTasks = tasks.filter(
    t => t.assignedTo === (currentUser?.id || "EMP-001")
  );

  // Compute counts for status cards (Test E-23)
  const inProgressCount = userTasks.filter(t => t.status === "In Progress").length;
  const waitingReviewCount = userTasks.filter(t => t.status === "Waiting Review").length;
  const completedCount = userTasks.filter(t => t.status === "Completed").length;
  const overdueCount = userTasks.filter(t => t.status === "Overdue").length;

  // Filter tasks
  let filteredTasks = userTasks.filter(t => {
    if (selectedStatus !== "All" && t.status !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort tasks (Test E-25)
  filteredTasks.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const handleOpenTask = (task) => {
    setSelectedTask(task);
    setNewProjectLink(task.projectLink || "");
    setShowAddLinkInput(false);
  };

  const handleToggleChecklist = (checkId) => {
    if (!selectedTask || selectedTask.status === "Waiting Review" || selectedTask.status === "Completed") {
      return; // Read-only
    }
    const updatedChecklist = selectedTask.checkList.map(item =>
      item.id === checkId ? { ...item, completed: !item.completed } : item
    );
    updateTaskChecklist(selectedTask.id, updatedChecklist);

    // Sync active drawer task
    const total = updatedChecklist.length;
    const comp = updatedChecklist.filter(c => c.completed).length;
    const progress = total > 0 ? Math.round((comp / total) * 100) : 0;
    setSelectedTask({
      ...selectedTask,
      checkList: updatedChecklist,
      progress
    });
  };

  const handleUploadMockFile = (e) => {
    if (!selectedTask || selectedTask.status === "Waiting Review" || selectedTask.status === "Completed") return;
    const file = e.target.files?.[0];
    if (!file) return;

    const newEvidence = [
      ...(selectedTask.evidenceFiles || []),
      { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` }
    ];

    setSelectedTask({ ...selectedTask, evidenceFiles: newEvidence });
  };

  const handleRemoveEvidence = (index) => {
    if (!selectedTask || selectedTask.status === "Waiting Review" || selectedTask.status === "Completed") return;
    const newEvidence = selectedTask.evidenceFiles.filter((_, idx) => idx !== index);
    setSelectedTask({ ...selectedTask, evidenceFiles: newEvidence });
  };

  const handleSaveProjectLink = () => {
    if (!newProjectLink.trim()) return;
    setSelectedTask({ ...selectedTask, projectLink: newProjectLink.trim() });
    setShowAddLinkInput(false);
  };

  // Evaluate 4 Strict Submission Requirements (Procedure 7.6 / Test E-27, E-28)
  const isAllChecklistDone =
    selectedTask?.checkList?.length > 0 &&
    selectedTask.checkList.every(c => c.completed);
  const hasEvidenceDoc =
    selectedTask?.evidenceFiles && selectedTask.evidenceFiles.length >= 1;
  const hasProjectLink = Boolean(selectedTask?.projectLink?.trim());
  const is100PercentProgress = selectedTask?.progress === 100;

  const canSubmit =
    isAllChecklistDone &&
    hasEvidenceDoc &&
    hasProjectLink &&
    is100PercentProgress &&
    selectedTask?.status === "In Progress";

  const handleSubmitForReview = () => {
    if (!canSubmit) return;
    submitTaskForReview(
      selectedTask.id,
      selectedTask.evidenceFiles,
      selectedTask.projectLink,
      selectedTask.checkList
    );
    // Update local drawer task to read-only Waiting Review
    setSelectedTask({
      ...selectedTask,
      status: "Waiting Review",
      progress: 100
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0E2148] tracking-tight">
          Assigned Tasks
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Track work progress, fulfill submission criteria with evidence, and submit tasks for manager approval.
        </p>
      </div>

      {/* Status Cards (Test E-23, E-24) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard
          title="All Tasks"
          value={userTasks.length}
          color="blue"
          onClick={() => setSelectedStatus("All")}
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          color="amber"
          onClick={() => setSelectedStatus("In Progress")}
        />
        <StatCard
          title="Waiting Review"
          value={waitingReviewCount}
          color="indigo"
          onClick={() => setSelectedStatus("Waiting Review")}
        />
        <StatCard
          title="Completed"
          value={completedCount}
          color="emerald"
          onClick={() => setSelectedStatus("Completed")}
        />
        <StatCard
          title="Overdue"
          value={overdueCount}
          color="rose"
          onClick={() => setSelectedStatus("Overdue")}
        />
      </div>

      {/* Filter and Search Bar (Test E-25) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          {/* Search Box */}
          <div className="flex-1 max-w-sm flex items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-blue-400">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search task by name or ID..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#0E2148] outline-none"
            >
              <option value="name">Task Name (A-Z)</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>

        {/* Clear/Refresh Filters */}
        <button
          onClick={() => {
            setSelectedStatus("All");
            setSearchQuery("");
            setSortBy("name");
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Assigned Tasks Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden card-shadow">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-sm text-[#0E2148]">
            {selectedStatus === "All" ? "All Tasks" : `${selectedStatus} Tasks`}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {filteredTasks.length} task(s) found
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <CheckSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No tasks matching the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-[#E8EEFA] text-[#0E2148] font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Task ID & Name</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {task.id}
                      </span>
                      <span className="font-bold text-[#0E2148] block text-xs">
                        {task.name}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-1 max-w-sm mt-0.5">
                        {task.description}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {task.priority}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{task.dueDate}</span>
                      </div>
                      {task.status === "Overdue" && (
                        <span className="text-[10px] font-bold text-rose-500 block mt-0.5">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 w-36">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            task.progress === 100 ? "bg-emerald-500" : "bg-[#1644FE]"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusPill status={task.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenTask(task)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#1644FE] hover:text-white font-semibold text-xs text-slate-700 transition-colors shadow-sm"
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

      {/* Task Details Slide-Over Drawer (Procedure 7.6 / Figures 19, 20 / Tests E-26 to E-28) */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedTask(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#1644FE]">
                      {selectedTask.id}
                    </span>
                    <StatusPill status={selectedTask.status} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0E2148]">
                    {selectedTask.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Due: {selectedTask.dueDate} · Priority: {selectedTask.priority}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* Read-Only Notice for Submitted Task (Test E-26) */}
                {(selectedTask.status === "Waiting Review" || selectedTask.status === "Completed") && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {selectedTask.status === "Waiting Review"
                        ? "Task is submitted and awaiting manager review. Modifications are locked."
                        : "Task has been approved by your department manager and is completed."}
                    </span>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Description
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    {selectedTask.description}
                  </p>
                </div>

                {/* Section 1: Check List (Step 1) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Check List ({selectedTask.progress}%)
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {selectedTask.checkList?.filter(c => c.completed).length} of {selectedTask.checkList?.length} completed
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedTask.checkList?.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          item.completed
                            ? "bg-emerald-50/40 border-emerald-200/80 text-emerald-900"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        } ${
                          selectedTask.status === "Waiting Review" || selectedTask.status === "Completed"
                            ? "cursor-not-allowed opacity-80"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          disabled={
                            selectedTask.status === "Waiting Review" || selectedTask.status === "Completed"
                          }
                          onChange={() => handleToggleChecklist(item.id)}
                          className="mt-0.5 rounded border-slate-300 text-[#1644FE] focus:ring-0"
                        />
                        <span className={item.completed ? "line-through text-slate-500 font-medium" : "font-medium"}>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section 2: Task Evidence Upload (Step 2) */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Task Evidence (PDF, JPG, PNG up to 100 MB)
                  </h4>

                  {/* Upload zone */}
                  {selectedTask.status !== "Waiting Review" && selectedTask.status !== "Completed" && (
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#1644FE] bg-slate-50/60 hover:bg-blue-50/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center mb-3">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-semibold text-slate-700">
                        Drop files here or browse
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Accepted: PDF, PNG, JPG (Max 100 MB each)
                      </span>
                      <input
                        type="file"
                        onChange={handleUploadMockFile}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                  )}

                  {/* Evidence File List */}
                  <div className="space-y-2">
                    {selectedTask.evidenceFiles?.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No evidence files uploaded yet.</p>
                    ) : (
                      selectedTask.evidenceFiles?.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="font-medium text-slate-800 truncate">{file.name}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">({file.size})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => downloadFile(file.name)}
                              className="p-1 text-slate-500 hover:text-blue-600"
                              title="Download file"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            {selectedTask.status !== "Waiting Review" && selectedTask.status !== "Completed" && (
                              <button
                                type="button"
                                onClick={() => handleRemoveEvidence(idx)}
                                className="p-1 text-slate-400 hover:text-rose-500"
                                title="Remove file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Section 3: Project Link (Step 3) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Project Link (Figma / Repository)
                    </h4>
                    {selectedTask.status !== "Waiting Review" && selectedTask.status !== "Completed" && (
                      <button
                        onClick={() => setShowAddLinkInput(!showAddLinkInput)}
                        className="text-xs font-semibold text-[#1644FE] hover:underline"
                      >
                        {selectedTask.projectLink ? "Edit Link" : "+ ADD LINK"}
                      </button>
                    )}
                  </div>

                  {showAddLinkInput ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="url"
                        value={newProjectLink}
                        onChange={(e) => setNewProjectLink(e.target.value)}
                        placeholder="https://www.figma.com/..."
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#1644FE]"
                      />
                      <button
                        onClick={handleSaveProjectLink}
                        className="px-3 py-2 bg-[#1644FE] text-white text-xs font-bold rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                  ) : selectedTask.projectLink ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <a
                        href={selectedTask.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1.5 truncate max-w-sm"
                      >
                        <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{selectedTask.projectLink}</span>
                      </a>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No project link attached.</p>
                  )}
                </div>

                {/* Section 4: 4 Submission Requirements (Figure 19 / Tests E-27, E-28) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs">
                  <h4 className="font-bold text-[#0E2148] mb-3 uppercase tracking-wider text-[11px]">
                    Submission Requirements (All 4 must be met)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      {isAllChecklistDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className={isAllChecklistDone ? "text-emerald-700 font-medium" : "text-slate-600"}>
                        All checklist items done
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      {hasEvidenceDoc ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className={hasEvidenceDoc ? "text-emerald-700 font-medium" : "text-slate-600"}>
                        At least one document uploaded
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      {hasProjectLink ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className={hasProjectLink ? "text-emerald-700 font-medium" : "text-slate-600"}>
                        A project link provided
                      </span>
                    </li>

                    <li className="flex items-center gap-2">
                      {is100PercentProgress ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className={is100PercentProgress ? "text-emerald-700 font-medium" : "text-slate-600"}>
                        100% progress
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                {selectedTask.status === "Waiting Review" ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-300 text-slate-600 font-bold text-xs tracking-wider cursor-not-allowed text-center"
                  >
                    Submitted for Review
                  </button>
                ) : selectedTask.status === "Completed" ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs tracking-wider cursor-not-allowed text-center"
                  >
                    Task Completed & Approved
                  </button>
                ) : (
                  <div>
                    {!canSubmit && (
                      <p className="text-xs text-rose-600 text-center font-medium mb-2.5">
                        Cannot be submitted. Requirements/Progress incomplete.
                      </p>
                    )}
                    <button
                      onClick={handleSubmitForReview}
                      disabled={!canSubmit}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs tracking-wider shadow-md transition-all text-center"
                    >
                      Submit for Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
