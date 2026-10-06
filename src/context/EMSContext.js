"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ANCHOR_DATE,
  INITIAL_USERS,
  INITIAL_TASKS,
  INITIAL_LEAVES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ATTENDANCE
} from "@/data/seed-data";
import { calculateWorkingDays } from "@/lib/utils";

const EMSContext = createContext(null);

const STORAGE_KEY_PREFIX = "bluebeacon_ems_";

export function EMSProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [anchorDate] = useState(ANCHOR_DATE);

  // Core state collections
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]); // Default to Bia for immediate testing
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);

  // Initialize from LocalStorage if available
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(`${STORAGE_KEY_PREFIX}users`);
      const storedAuth = localStorage.getItem(`${STORAGE_KEY_PREFIX}current_user`);
      const storedTasks = localStorage.getItem(`${STORAGE_KEY_PREFIX}tasks`);
      const storedLeaves = localStorage.getItem(`${STORAGE_KEY_PREFIX}leaves`);
      const storedAnnouncements = localStorage.getItem(`${STORAGE_KEY_PREFIX}announcements`);
      const storedNotifications = localStorage.getItem(`${STORAGE_KEY_PREFIX}notifications`);
      const storedAttendance = localStorage.getItem(`${STORAGE_KEY_PREFIX}attendance`);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedLeaves) setLeaves(JSON.parse(storedLeaves));
      if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));
      if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
      if (storedAttendance) setAttendance(JSON.parse(storedAttendance));

      if (storedAuth) {
        setCurrentUser(JSON.parse(storedAuth));
      } else {
        setCurrentUser(INITIAL_USERS[0]);
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using seed data", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}users`, JSON.stringify(users));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}leaves`, JSON.stringify(leaves));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}announcements`, JSON.stringify(announcements));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}attendance`, JSON.stringify(attendance));
      if (currentUser) {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}current_user`, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}current_user`);
      }
    } catch (e) {
      console.warn("Could not persist to localStorage", e);
    }
  }, [users, currentUser, tasks, leaves, announcements, notifications, attendance, isInitialized]);

  // Reset to default seed
  const resetToDefaultSeed = () => {
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setTasks(INITIAL_TASKS);
    setLeaves(INITIAL_LEAVES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAttendance(INITIAL_ATTENDANCE);
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  };

  // -------------------------------------------------------------
  // AUTHENTICATION & SESSION MANAGEMENT
  // -------------------------------------------------------------

  const login = (usernameOrEmail, password) => {
    const trimmedInput = (usernameOrEmail || "").trim().toLowerCase();
    const user = users.find(
      u => u.username.toLowerCase() === trimmedInput || u.email.toLowerCase() === trimmedInput
    );

    if (!user) {
      return {
        success: false,
        error: "Invalid Username or Email. Please check your credentials and try again."
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        error: "Incorrect Password. Please try again."
      };
    }

    if (!user.isActivated) {
      return {
        success: false,
        error: "Account is not yet activated. Please click 'Activate your account' below."
      };
    }

    setCurrentUser(user);
    return {
      success: true,
      user,
      isFirstLogin: user.isFirstLogin
    };
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}current_user`);
    } catch (e) {
      console.error(e);
    }
  };

  const switchDemoUser = (roleOrId) => {
    let target;
    if (roleOrId === "manager" || roleOrId === "MGR-001") {
      target = users.find(u => u.role === "manager");
    } else if (roleOrId === "employee" || roleOrId === "EMP-001") {
      target = users.find(u => u.id === "EMP-001");
    } else {
      target = users.find(u => u.id === roleOrId);
    }
    if (target) {
      setCurrentUser(target);
      return target;
    }
    return null;
  };

  const activateAccount = (employeeId, companyEmail) => {
    const trimmedId = (employeeId || "").trim().toUpperCase();
    const trimmedEmail = (companyEmail || "").trim().toLowerCase();

    const user = users.find(u => u.id === trimmedId);
    if (!user) {
      return {
        success: false,
        error: "Employee ID not found. Please check your Employee ID and try again."
      };
    }

    if (user.email.toLowerCase() !== trimmedEmail) {
      return {
        success: false,
        error: "Please enter a valid company email address."
      };
    }

    // Generate default temporary credentials
    const defaultPassword = "DefaultPassword@2026";
    const updatedUsers = users.map(u => {
      if (u.id === trimmedId) {
        return {
          ...u,
          isActivated: true,
          isFirstLogin: true,
          password: defaultPassword
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    return {
      success: true,
      email: user.email,
      defaultPassword
    };
  };

  const completeFirstLogin = (userId, newUsername, newPassword) => {
    let updatedUser = null;
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        updatedUser = {
          ...u,
          username: newUsername,
          password: newPassword,
          isFirstLogin: false
        };
        return updatedUser;
      }
      return u;
    });

    setUsers(updatedUsers);
    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
    return { success: true };
  };

  // Resolves Defect D-02: Strictly verifies current password
  const changePassword = (userId, currentPassword, newPassword) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
      return { success: false, error: "User not found." };
    }

    if (user.password !== currentPassword) {
      return {
        success: false,
        error: "Current password is incorrect. Please try again."
      };
    }

    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    setUsers(updatedUsers);
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, password: newPassword });
    }

    return { success: true };
  };

  // -------------------------------------------------------------
  // PROFILE MANAGEMENT (Resolves D-08, D-09)
  // -------------------------------------------------------------

  const updateProfile = (userId, editableFields) => {
    let updatedUser = null;
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        updatedUser = {
          ...u,
          dateOfBirth: editableFields.dateOfBirth ?? u.dateOfBirth,
          gender: editableFields.gender ?? u.gender,
          civilStatus: editableFields.civilStatus ?? u.civilStatus,
          nationality: editableFields.nationality ?? u.nationality,
          phone: editableFields.phone ?? u.phone,
          address: editableFields.address ?? u.address,
          emergencyContact: editableFields.emergencyContact ?? u.emergencyContact,
          avatar: editableFields.avatar ?? u.avatar
        };
        return updatedUser;
      }
      return u;
    });

    setUsers(updatedUsers);
    if (currentUser?.id === userId && updatedUser) {
      setCurrentUser(updatedUser);
    }
    return { success: true };
  };

  // -------------------------------------------------------------
  // TASK MANAGEMENT (Resolves D-13, E-27, E-28)
  // -------------------------------------------------------------

  const updateTaskChecklist = (taskId, checkList) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const total = checkList.length;
          const completedCount = checkList.filter(c => c.completed).length;
          const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;
          return { ...t, checkList, progress };
        }
        return t;
      })
    );
  };

  const submitTaskForReview = (taskId, evidenceFiles, projectLink, checkList) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status: "Waiting Review",
            progress: 100,
            evidenceFiles,
            projectLink,
            checkList,
            submittedAt: anchorDate
          };
        }
        return t;
      })
    );

    // Notify manager
    const task = tasks.find(t => t.id === taskId);
    addNotification({
      userId: "MGR-001",
      title: "Task Submitted for Review",
      message: `${currentUser?.name || "An employee"} submitted task '${task?.name || taskId}' for review.`,
      link: "/manager/tasks"
    });

    return { success: true };
  };

  const createAndAssignTask = (taskData) => {
    const newTaskId = `TSK-2026-${String(tasks.length + 20).padStart(3, "0")}`;
    const assignee = users.find(u => u.id === taskData.assignedTo);

    const newTask = {
      id: newTaskId,
      name: taskData.name,
      description: taskData.description || "",
      assignedTo: taskData.assignedTo,
      assigneeName: assignee ? assignee.name : "Assigned Employee",
      priority: taskData.priority || "Medium",
      dueDate: taskData.dueDate,
      status: "Assigned", // Resolves D-17 status vocabulary
      progress: 0,
      checkList: (taskData.checkList || []).map((label, idx) => ({
        id: `c_${idx + 1}`,
        label,
        completed: false
      })),
      evidenceFiles: taskData.evidenceFiles || [],
      projectLink: "",
      createdAt: anchorDate
    };

    setTasks(prev => [newTask, ...prev]);

    // Notify assigned employee
    addNotification({
      userId: taskData.assignedTo,
      title: "New Task Assigned",
      message: `You were assigned a new task: '${taskData.name}'. Due ${taskData.dueDate}.`,
      link: "/employee/tasks"
    });

    return { success: true, task: newTask };
  };

  const updateTaskManagerControls = (taskId, { status, progress }) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status: status !== undefined ? status : t.status,
            progress: progress !== undefined ? progress : t.progress
          };
        }
        return t;
      })
    );
  };

  const approveTaskSubmission = (taskId) => {
    let taskAssignee = null;
    let taskName = "";

    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          taskAssignee = t.assignedTo;
          taskName = t.name;
          return { ...t, status: "Completed", progress: 100 };
        }
        return t;
      })
    );

    if (taskAssignee) {
      addNotification({
        userId: taskAssignee,
        title: "Task Approved",
        message: `Your submission for '${taskName}' has been approved by your Department Manager.`,
        link: "/employee/tasks"
      });
    }

    return { success: true };
  };

  const requestTaskRevision = (taskId, managerNote = "") => {
    let taskAssignee = null;
    let taskName = "";

    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          taskAssignee = t.assignedTo;
          taskName = t.name;
          return { ...t, status: "In Progress", progress: 85, managerNote };
        }
        return t;
      })
    );

    if (taskAssignee) {
      addNotification({
        userId: taskAssignee,
        title: "Revision Requested",
        message: `Task '${taskName}' requires revision. Manager note: ${managerNote || "Please review checklist."}`,
        link: "/employee/tasks"
      });
    }

    return { success: true };
  };

  // -------------------------------------------------------------
  // LEAVE MANAGEMENT (Resolves D-10, Test M-22)
  // -------------------------------------------------------------

  const fileLeaveRequest = (leaveData) => {
    const workingDays = calculateWorkingDays(leaveData.startDate, leaveData.endDate);
    const newId = `LEV-2026-${String(leaves.length + 10).padStart(3, "0")}`;

    const newLeave = {
      id: newId,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      position: currentUser.position,
      leaveType: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      workingDays,
      filedDate: anchorDate,
      reason: leaveData.reason,
      attachment: leaveData.attachment || "",
      status: "Pending",
      managerNote: ""
    };

    setLeaves(prev => [newLeave, ...prev]);

    // Notify manager
    addNotification({
      userId: "MGR-001",
      title: "New Leave Request",
      message: `${currentUser.name} filed a ${leaveData.leaveType} Leave request for ${workingDays} day(s).`,
      link: "/manager/leave-approvals"
    });

    return { success: true, leave: newLeave };
  };

  const cancelLeaveRequest = (leaveId) => {
    setLeaves(prev => prev.filter(l => l.id !== leaveId));
    return { success: true };
  };

  // Approving deducts days from employee balance (Test M-22)
  const approveLeaveRequest = (leaveId, managerNote = "") => {
    let empId = null;
    let leaveTypeKey = "vacation";
    let daysToDeduct = 0;

    setLeaves(prev =>
      prev.map(l => {
        if (l.id === leaveId) {
          empId = l.employeeId;
          leaveTypeKey = (l.leaveType || "vacation").toLowerCase();
          daysToDeduct = l.workingDays;
          return { ...l, status: "Approved", managerNote };
        }
        return t;
      })
    );

    // Deduct leave credits from employee
    if (empId && daysToDeduct > 0) {
      setUsers(prev =>
        prev.map(u => {
          if (u.id === empId && u.leaveBalances) {
            const currentBalance = u.leaveBalances[leaveTypeKey] ?? 10;
            const updatedBalance = Math.max(0, currentBalance - daysToDeduct);
            return {
              ...u,
              leaveBalances: {
                ...u.leaveBalances,
                [leaveTypeKey]: updatedBalance
              }
            };
          }
          return u;
        })
      );

      // If current user is the employee, keep local balance synced
      if (currentUser?.id === empId && currentUser?.leaveBalances) {
        const curBal = currentUser.leaveBalances[leaveTypeKey] ?? 10;
        setCurrentUser({
          ...currentUser,
          leaveBalances: {
            ...currentUser.leaveBalances,
            [leaveTypeKey]: Math.max(0, curBal - daysToDeduct)
          }
        });
      }

      addNotification({
        userId: empId,
        title: "Leave Request Approved",
        message: `Your leave request has been approved. ${managerNote ? `Note: ${managerNote}` : ""}`,
        link: "/employee/leave"
      });
    }

    return { success: true };
  };

  const rejectLeaveRequest = (leaveId, managerNote = "") => {
    let empId = null;
    setLeaves(prev =>
      prev.map(l => {
        if (l.id === leaveId) {
          empId = l.employeeId;
          return { ...l, status: "Rejected", managerNote };
        }
        return l;
      })
    );

    if (empId) {
      addNotification({
        userId: empId,
        title: "Leave Request Rejected",
        message: `Your leave request was not approved. ${managerNote ? `Note: ${managerNote}` : ""}`,
        link: "/employee/leave"
      });
    }

    return { success: true };
  };

  // -------------------------------------------------------------
  // ANNOUNCEMENTS (Resolves D-03, D-11, D-14)
  // -------------------------------------------------------------

  const acknowledgeAnnouncement = (announcementId) => {
    if (!currentUser) return;
    setAnnouncements(prev =>
      prev.map(a => {
        if (a.id === announcementId) {
          const currentAcks = a.acknowledgedBy || [];
          if (!currentAcks.includes(currentUser.id)) {
            return { ...a, acknowledgedBy: [...currentAcks, currentUser.id] };
          }
        }
        return a;
      })
    );
  };

  const postAnnouncement = (annData) => {
    const newId = `ANC-2026-${String(announcements.length + 10).padStart(3, "0")}`;
    const isFeat = Boolean(annData.isFeatured);

    const newAnnouncement = {
      id: newId,
      title: annData.title,
      category: annData.category || "General",
      author: currentUser?.name || "Department Manager",
      effectiveDate: annData.effectiveDate || anchorDate,
      audience: annData.audience || "All Department Employees",
      description: annData.description,
      expectedImpact: annData.expectedImpact || "",
      isFeatured: isFeat,
      acknowledgedBy: [],
      createdAt: anchorDate
    };

    setAnnouncements(prev => {
      // If setting this as featured, unfeature others
      const unfeaturedList = isFeat ? prev.map(a => ({ ...a, isFeatured: false })) : prev;
      return [newAnnouncement, ...unfeaturedList];
    });

    return { success: true, announcement: newAnnouncement };
  };

  const toggleFeatureAnnouncement = (announcementId) => {
    setAnnouncements(prev =>
      prev.map(a => {
        if (a.id === announcementId) {
          return { ...a, isFeatured: !a.isFeatured };
        }
        // If enabling featured on target, disable on others
        return a;
      })
    );
  };

  // Resolves Defect D-03: Permanently delete announcement
  const deleteAnnouncement = (announcementId) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    return { success: true };
  };

  // -------------------------------------------------------------
  // NOTIFICATIONS (Resolves D-05, E-15, E-16)
  // -------------------------------------------------------------

  const addNotification = ({ userId, title, message, link }) => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      userId,
      title,
      message,
      link: link || "#",
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications(prev =>
      prev.map(n => (n.userId === currentUser.id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.filter(n => n.userId !== currentUser.id));
  };

  return (
    <EMSContext.Provider
      value={{
        isInitialized,
        anchorDate,
        users,
        currentUser,
        tasks,
        leaves,
        announcements,
        notifications,
        attendance,

        // Auth
        login,
        logout,
        switchDemoUser,
        activateAccount,
        completeFirstLogin,
        changePassword,

        // Profile
        updateProfile,

        // Tasks
        updateTaskChecklist,
        submitTaskForReview,
        createAndAssignTask,
        updateTaskManagerControls,
        approveTaskSubmission,
        requestTaskRevision,

        // Leaves
        fileLeaveRequest,
        cancelLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,

        // Announcements
        acknowledgeAnnouncement,
        postAnnouncement,
        toggleFeatureAnnouncement,
        deleteAnnouncement,

        // Notifications
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,

        // Helpers
        resetToDefaultSeed
      }}
    >
      {children}
    </EMSContext.Provider>
  );
}

export function useEMS() {
  const context = useContext(EMSContext);
  if (!context) {
    throw new Error("useEMS must be used within an EMSProvider");
  }
  return context;
}
