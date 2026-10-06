/**
 * BlueBeacon Employee Management System (EMS)
 * Unified Master Seed Data (Resolves D-16 and D-17)
 * Anchor Date: July 13, 2026 (Monday)
 */

export const ANCHOR_DATE = "2026-07-13";

export const INITIAL_USERS = [
  {
    id: "EMP-001",
    name: "Bianca Allyzon P. Antonio",
    shortName: "Bia",
    email: "bapantonio@bluebeacon.com", // Canonical email resolving D-16
    username: "bianca.antonio",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Web Designer",
    department: "Design & Marketing",
    dateHired: "January 15, 2024",
    employmentType: "Regular / Full-time",
    phone: "+63 917 123 4567",
    address: "Unit 402, Solaris Residences, Makati City",
    gender: "Female",
    civilStatus: "Single",
    dateOfBirth: "2001-08-24",
    nationality: "Filipino",
    emergencyContact: {
      name: "Maria Antonio",
      relationship: "Mother",
      phone: "+63 918 987 6543"
    },
    leaveBalances: {
      vacation: 9,
      sick: 5,
      emergency: 3,
      birthday: 1
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "MGR-001",
    name: "Andrei Vance",
    shortName: "Andrei",
    email: "avance@bluebeacon.com",
    username: "andrei.vance",
    password: "Password@123",
    role: "manager",
    isActivated: true,
    isFirstLogin: false,
    position: "Creative Director / Dept Manager",
    department: "Design & Marketing",
    dateHired: "March 1, 2022",
    employmentType: "Regular / Full-time",
    phone: "+63 920 555 0192",
    address: "14B Pacific Tower, BGC, Taguig City",
    gender: "Male",
    civilStatus: "Married",
    dateOfBirth: "1992-04-12",
    nationality: "Filipino",
    emergencyContact: {
      name: "Clara Vance",
      relationship: "Spouse",
      phone: "+63 920 555 0199"
    },
    leaveBalances: {
      vacation: 12,
      sick: 7,
      emergency: 3,
      birthday: 1
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-002",
    name: "Marcus Dizon",
    shortName: "Marcus",
    email: "mdizon@bluebeacon.com",
    username: "marcus.dizon",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "UI/UX Designer",
    department: "Design & Marketing",
    dateHired: "June 1, 2024",
    employmentType: "Regular / Full-time",
    phone: "+63 917 234 5678",
    address: "Quezon City",
    gender: "Male",
    civilStatus: "Single",
    dateOfBirth: "1999-11-15",
    nationality: "Filipino",
    emergencyContact: { name: "Eduardo Dizon", relationship: "Father", phone: "+63 917 999 8888" },
    leaveBalances: { vacation: 8, sick: 5, emergency: 3, birthday: 1 }
  },
  {
    id: "EMP-003",
    name: "Chloe Santos",
    shortName: "Chloe",
    email: "csantos@bluebeacon.com",
    username: "chloe.santos",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Frontend Developer",
    department: "Design & Marketing",
    dateHired: "October 10, 2024",
    employmentType: "Regular / Full-time",
    phone: "+63 917 345 6789",
    address: "Pasig City",
    gender: "Female",
    civilStatus: "Single",
    dateOfBirth: "2000-02-18",
    nationality: "Filipino",
    emergencyContact: { name: "Teresa Santos", relationship: "Mother", phone: "+63 917 888 7777" },
    leaveBalances: { vacation: 7, sick: 4, emergency: 3, birthday: 1 }
  },
  {
    id: "EMP-004",
    name: "Liam Reyes",
    shortName: "Liam",
    email: "lreyes@bluebeacon.com",
    username: "liam.reyes",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Graphic Designer",
    department: "Design & Marketing",
    dateHired: "February 20, 2025",
    employmentType: "Probationary",
    phone: "+63 917 456 7890",
    address: "Mandaluyong City",
    gender: "Male",
    civilStatus: "Single",
    dateOfBirth: "2002-05-30",
    nationality: "Filipino",
    emergencyContact: { name: "Rosa Reyes", relationship: "Mother", phone: "+63 917 777 6666" },
    leaveBalances: { vacation: 5, sick: 5, emergency: 2, birthday: 1 }
  },
  {
    id: "EMP-005",
    name: "Sophia Lim",
    shortName: "Sophia",
    email: "slim@bluebeacon.com",
    username: "sophia.lim",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Content Strategist",
    department: "Design & Marketing",
    dateHired: "April 5, 2024",
    employmentType: "Regular / Full-time",
    phone: "+63 917 567 8901",
    address: "San Juan City",
    gender: "Female",
    civilStatus: "Single",
    dateOfBirth: "1998-09-12",
    nationality: "Filipino",
    emergencyContact: { name: "Henry Lim", relationship: "Father", phone: "+63 917 666 5555" },
    leaveBalances: { vacation: 10, sick: 5, emergency: 3, birthday: 1 }
  },
  {
    id: "EMP-006",
    name: "Noah Bautista",
    shortName: "Noah",
    email: "nbautista@bluebeacon.com",
    username: "noah.bautista",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Product Designer",
    department: "Design & Marketing",
    dateHired: "August 12, 2023",
    employmentType: "Regular / Full-time",
    phone: "+63 917 678 9012",
    address: "Taguig City",
    gender: "Male",
    civilStatus: "Married",
    dateOfBirth: "1995-12-04",
    nationality: "Filipino",
    emergencyContact: { name: "Gwen Bautista", relationship: "Spouse", phone: "+63 917 555 4444" },
    leaveBalances: { vacation: 11, sick: 6, emergency: 3, birthday: 1 }
  },
  {
    id: "EMP-007",
    name: "Isabella Cruz",
    shortName: "Isabella",
    email: "icruz@bluebeacon.com",
    username: "isabella.cruz",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Motion Designer",
    department: "Design & Marketing",
    dateHired: "November 18, 2024",
    employmentType: "Regular / Full-time",
    phone: "+63 917 789 0123",
    address: "Manila",
    gender: "Female",
    civilStatus: "Single",
    dateOfBirth: "2001-03-27",
    nationality: "Filipino",
    emergencyContact: { name: "Luz Cruz", relationship: "Mother", phone: "+63 917 444 3333" },
    leaveBalances: { vacation: 6, sick: 4, emergency: 3, birthday: 1 }
  },
  {
    id: "EMP-008",
    name: "Ethan Garcia",
    shortName: "Ethan",
    email: "egarcia@bluebeacon.com",
    username: "ethan.garcia",
    password: "Password@123",
    role: "employee",
    isActivated: true,
    isFirstLogin: false,
    position: "Brand Specialist",
    department: "Design & Marketing",
    dateHired: "March 15, 2025",
    employmentType: "Probationary",
    phone: "+63 917 890 1234",
    address: "Paranaque City",
    gender: "Male",
    civilStatus: "Single",
    dateOfBirth: "1997-07-09",
    nationality: "Filipino",
    emergencyContact: { name: "Victor Garcia", relationship: "Brother", phone: "+63 917 333 2222" },
    leaveBalances: { vacation: 4, sick: 3, emergency: 2, birthday: 1 }
  },
  // Inactive Employee reserved for testing Account Activation (Procedure 7.1)
  {
    id: "EMP-009",
    name: "Elena Morales",
    shortName: "Elena",
    email: "emorales@bluebeacon.com",
    username: "elena.morales",
    password: "InitPassword#2026",
    role: "employee",
    isActivated: false, // Must be activated first
    isFirstLogin: true,
    position: "Junior Designer",
    department: "Design & Marketing",
    dateHired: "July 1, 2026",
    employmentType: "Probationary",
    phone: "+63 917 999 0001",
    address: "Makati City",
    gender: "Female",
    civilStatus: "Single",
    dateOfBirth: "2003-01-14",
    nationality: "Filipino",
    emergencyContact: { name: "Arturo Morales", relationship: "Father", phone: "+63 917 111 2222" },
    leaveBalances: { vacation: 5, sick: 5, emergency: 2, birthday: 1 }
  }
];

export const INITIAL_TASKS = [
  {
    id: "TSK-2026-018",
    name: "Design System Tokens & Components",
    description: "Audit and construct complete Figma & code tokens for the BlueBeacon web application design system.",
    assignedTo: "EMP-001",
    assigneeName: "Bianca Allyzon P. Antonio",
    priority: "High",
    dueDate: "2026-07-18",
    status: "In Progress",
    progress: 60,
    checkList: [
      { id: "c1", label: "Extract color tokens from Figma", completed: true },
      { id: "c2", label: "Normalize button and input variants", completed: true },
      { id: "c3", label: "Implement modal and slide-over primitives", completed: true },
      { id: "c4", label: "Assemble documentation handbook", completed: false },
      { id: "c5", label: "Cross-browser visual QA", completed: false }
    ],
    evidenceFiles: [
      { name: "token-spec-v1.pdf", size: "2.4 MB" }
    ],
    projectLink: "https://www.figma.com/design/bluebeacon-tokens",
    createdAt: "2026-07-06"
  },
  {
    id: "TSK-2026-019",
    name: "Leave Flow Screenshots & Prototype",
    description: "Capture updated screenshots for the employee standard operating manual and verify interactive flow.",
    assignedTo: "EMP-001",
    assigneeName: "Bianca Allyzon P. Antonio",
    priority: "Medium",
    dueDate: "2026-07-14",
    status: "Waiting Review",
    progress: 100,
    checkList: [
      { id: "c1", label: "Capture leave filing panel with 2-day gate", completed: true },
      { id: "c2", label: "Verify working day calculation counter", completed: true },
      { id: "c3", label: "Upload high-resolution PNGs to asset folder", completed: true }
    ],
    evidenceFiles: [
      { name: "leave-flow-screen-spec.png", size: "4.1 MB" },
      { name: "calendar-gate-audit.pdf", size: "1.2 MB" }
    ],
    projectLink: "https://www.figma.com/proto/bluebeacon-sop-flows",
    createdAt: "2026-07-08",
    submittedAt: "2026-07-12"
  },
  {
    id: "TSK-2026-015",
    name: "Q2 Brand Audit Presentation",
    description: "Assemble comprehensive presentation covering quarterly marketing asset compliance and typography usage.",
    assignedTo: "EMP-001",
    assigneeName: "Bianca Allyzon P. Antonio",
    priority: "Medium",
    dueDate: "2026-06-30",
    status: "Completed",
    progress: 100,
    checkList: [
      { id: "c1", label: "Compile social media banner screenshots", completed: true },
      { id: "c2", label: "Document brand font discrepancies", completed: true },
      { id: "c3", label: "Review deck with Andrei Vance", completed: true }
    ],
    evidenceFiles: [
      { name: "q2-brand-audit-deck.pdf", size: "12.8 MB" }
    ],
    projectLink: "https://slides.google.com/presentation/d/brand-audit",
    createdAt: "2026-06-15",
    submittedAt: "2026-06-29"
  },
  {
    id: "TSK-2026-012",
    name: "Announcement Page Layout",
    description: "Create and publish the announcement page for internal company updates.",
    assignedTo: "EMP-001",
    assigneeName: "Bianca Allyzon P. Antonio",
    priority: "High",
    dueDate: "2026-07-05", // Overdue relative to July 13, 2026
    status: "Overdue",
    progress: 40,
    checkList: [
      { id: "c1", label: "Design hero card for featured notice", completed: true },
      { id: "c2", label: "Build category filter sidebar", completed: true },
      { id: "c3", label: "Implement acknowledge button state", completed: false }
    ],
    evidenceFiles: [],
    projectLink: "",
    createdAt: "2026-06-25"
  },
  {
    id: "TSK-2026-020",
    name: "Mobile App Wireframing",
    description: "Draft wireframe layouts for the mobile employee dashboard companion app.",
    assignedTo: "EMP-002",
    assigneeName: "Marcus Dizon",
    priority: "High",
    dueDate: "2026-07-20",
    status: "In Progress",
    progress: 50,
    checkList: [
      { id: "c1", label: "Define 375px mobile viewport grid", completed: true },
      { id: "c2", label: "Draft quick-punch attendance card", completed: true },
      { id: "c3", label: "Draft task notification tray", completed: false }
    ],
    evidenceFiles: [],
    projectLink: "https://www.figma.com/design/mobile-ems",
    createdAt: "2026-07-10"
  },
  {
    id: "TSK-2026-021",
    name: "Attendance CSV Exporter Module",
    description: "Develop client-side CSV generator with filtered parameter support.",
    assignedTo: "EMP-003",
    assigneeName: "Chloe Santos",
    priority: "Medium",
    dueDate: "2026-07-15",
    status: "Waiting Review",
    progress: 100,
    checkList: [
      { id: "c1", label: "Format date strings and column escapes", completed: true },
      { id: "c2", label: "Trigger dynamic Blob download link", completed: true },
      { id: "c3", label: "Write unit test verification suite", completed: true }
    ],
    evidenceFiles: [
      { name: "csv-export-benchmark.pdf", size: "750 KB" }
    ],
    projectLink: "https://github.com/bluebeacon/ems-exporter",
    createdAt: "2026-07-09",
    submittedAt: "2026-07-13"
  },
  {
    id: "TSK-2026-022",
    name: "Employee Handbook Vector Graphics",
    description: "Illustrate custom spot graphics for employee handbook chapters.",
    assignedTo: "EMP-004",
    assigneeName: "Liam Reyes",
    priority: "Low",
    dueDate: "2026-07-25",
    status: "Assigned",
    progress: 0,
    checkList: [
      { id: "c1", label: "Read chapter brief and conceptualize styles", completed: false },
      { id: "c2", label: "Produce 4 spot illustrations in SVG", completed: false }
    ],
    evidenceFiles: [],
    projectLink: "",
    createdAt: "2026-07-12"
  }
];

export const INITIAL_LEAVES = [
  {
    id: "LEV-2026-009",
    employeeId: "EMP-001",
    employeeName: "Bianca Allyzon P. Antonio",
    department: "Design & Marketing",
    position: "Web Designer",
    leaveType: "Vacation", // Canonical Vacation leave resolving D-16
    startDate: "2026-07-20",
    endDate: "2026-07-24",
    workingDays: 5,
    filedDate: "2026-07-11", // Filed > 2 days in advance
    reason: "Annual family reunion and vacation in Palawan.",
    attachment: "itinerary-confirmation.pdf",
    status: "Pending",
    managerNote: ""
  },
  {
    id: "LEV-2026-008",
    employeeId: "EMP-002",
    employeeName: "Marcus Dizon",
    department: "Design & Marketing",
    position: "UI/UX Designer",
    leaveType: "Sick",
    startDate: "2026-07-16",
    endDate: "2026-07-17",
    workingDays: 2,
    filedDate: "2026-07-13",
    reason: "Scheduled minor dental surgery and recovery.",
    attachment: "medical-dental-cert.pdf",
    status: "Pending",
    managerNote: ""
  },
  {
    id: "LEV-2026-007",
    employeeId: "EMP-003",
    employeeName: "Chloe Santos",
    department: "Design & Marketing",
    position: "Frontend Developer",
    leaveType: "Emergency",
    startDate: "2026-07-14",
    endDate: "2026-07-14",
    workingDays: 1,
    filedDate: "2026-07-12",
    reason: "Urgent residential water pipe repair and home maintenance.",
    attachment: "",
    status: "Pending",
    managerNote: ""
  },
  {
    id: "LEV-2026-004",
    employeeId: "EMP-001",
    employeeName: "Bianca Allyzon P. Antonio",
    department: "Design & Marketing",
    position: "Web Designer",
    leaveType: "Sick",
    startDate: "2026-05-18",
    endDate: "2026-05-19",
    workingDays: 2,
    filedDate: "2026-05-15",
    reason: "Flu symptoms and bed rest advised by physician.",
    attachment: "medical-certificate-may.pdf",
    status: "Approved",
    managerNote: "Approved. Take care and rest well."
  },
  {
    id: "LEV-2026-001",
    employeeId: "EMP-001",
    employeeName: "Bianca Allyzon P. Antonio",
    department: "Design & Marketing",
    position: "Web Designer",
    leaveType: "Birthday",
    startDate: "2026-08-24",
    endDate: "2026-08-24",
    workingDays: 1,
    filedDate: "2026-06-01",
    reason: "Company birthday privilege leave.",
    attachment: "",
    status: "Approved",
    managerNote: "Happy early birthday Bia!"
  },
  {
    id: "LEV-2025-012",
    employeeId: "EMP-001",
    employeeName: "Bianca Allyzon P. Antonio",
    department: "Design & Marketing",
    position: "Web Designer",
    leaveType: "Vacation",
    startDate: "2025-12-22",
    endDate: "2025-12-26",
    workingDays: 5,
    filedDate: "2025-12-01",
    reason: "Year-end holiday break with extended family.",
    attachment: "",
    status: "Approved",
    managerNote: "Approved for annual Christmas shutdown."
  },
  {
    id: "LEV-2025-008",
    employeeId: "EMP-001",
    employeeName: "Bianca Allyzon P. Antonio",
    department: "Design & Marketing",
    position: "Web Designer",
    leaveType: "Vacation",
    startDate: "2025-09-15",
    endDate: "2025-09-17",
    workingDays: 3,
    filedDate: "2025-09-02",
    reason: "Short trip to Cebu City.",
    attachment: "",
    status: "Approved",
    managerNote: "Approved."
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANC-2026-001",
    title: "Q3 Town Hall & EMS Rollout Schedule",
    category: "General",
    author: "Andrei Vance",
    effectiveDate: "2026-07-15",
    audience: "All Department Employees",
    description: "All Design & Marketing personnel are requested to attend the upcoming Q3 Town Hall on July 15 at 2:00 PM via Zoom. We will be officially rolling out the integrated BlueBeacon EMS web portal, introducing updated leave guidelines, and reviewing department OKRs.",
    expectedImpact: "Attendance is mandatory. Please ensure pending tasks are logged in the EMS prior to the briefing.",
    isFeatured: true,
    acknowledgedBy: ["EMP-002", "EMP-003", "EMP-004"], // EMP-001 (Bia) has NOT acknowledged yet
    createdAt: "2026-07-10"
  },
  {
    id: "ANC-2026-002",
    title: "Annual Comprehensive Health Examination (AIME) 2026",
    category: "Company Policy",
    author: "Human Resources",
    effectiveDate: "2026-07-22",
    audience: "All Regular Employees",
    description: "The annual executive check-up schedule is now open for reservation. All regular employees may book their preferred diagnostic clinic through the HR wellness portal before July 31, 2026.",
    expectedImpact: "Employees may avail of half-day health privilege on their examination day.",
    isFeatured: false,
    acknowledgedBy: ["EMP-001", "EMP-002"],
    createdAt: "2026-07-08"
  },
  {
    id: "ANC-2026-003",
    title: "Mid-Year Performance Review Deadlines",
    category: "Company Policy",
    author: "Andrei Vance",
    effectiveDate: "2026-07-01",
    audience: "Design & Marketing",
    description: "Self-evaluations for the 2026 Mid-Year Performance Review must be submitted by Friday, July 24, 2026. One-on-one evaluation sessions will be scheduled during the first week of August.",
    expectedImpact: "Completion of self-appraisal forms is required for salary review eligibility.",
    isFeatured: false,
    acknowledgedBy: ["EMP-001", "EMP-003", "EMP-005"],
    createdAt: "2026-07-01"
  },
  {
    id: "ANC-2026-004",
    title: "Updated Travel & Expense Reimbursement Guidelines",
    category: "System Updates",
    author: "Finance & Accounting",
    effectiveDate: "2026-06-25",
    audience: "All Employees",
    description: "Effective July 1, 2026, all official business travel expense receipts must be submitted in digital PDF format within 10 calendar days of travel completion.",
    expectedImpact: "Physical paper receipts will no longer be processed by accounting.",
    isFeatured: false,
    acknowledgedBy: ["EMP-001", "EMP-004"],
    createdAt: "2026-06-25"
  },
  {
    id: "ANC-2026-005",
    title: "Design Sprint: BlueBeacon 2.0 Identity",
    category: "Events & Culture",
    author: "Andrei Vance",
    effectiveDate: "2026-08-03",
    audience: "Design & Marketing",
    description: "Mark your calendars for our upcoming 3-day Design Sprint focused on refreshing brand guidelines and micro-interaction animations across all customer touchpoints.",
    expectedImpact: "Regular sprint tasks will be put on hold during these 3 days.",
    isFeatured: false,
    acknowledgedBy: [],
    createdAt: "2026-07-12"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    userId: "EMP-001",
    title: "Task Approved",
    message: "Andrei Vance approved your submission for 'Q2 Brand Audit Presentation'.",
    link: "/employee/tasks",
    read: true,
    createdAt: "2026-06-30T10:15:00"
  },
  {
    id: "NOTIF-002",
    userId: "EMP-001",
    title: "New Announcement",
    message: "Q3 Town Hall & EMS Rollout Schedule has been posted.",
    link: "/employee/announcements",
    read: false,
    createdAt: "2026-07-10T14:00:00"
  },
  {
    id: "NOTIF-003",
    userId: "EMP-001",
    title: "Leave Request Submitted",
    message: "Your Vacation Leave request for July 20-24 is currently pending manager approval.",
    link: "/employee/leave",
    read: false,
    createdAt: "2026-07-11T09:30:00"
  },
  {
    id: "NOTIF-004",
    userId: "EMP-001",
    title: "Task Revision Reminder",
    message: "Task 'Announcement Page Layout' is past due. Please update progress or submit evidence.",
    link: "/employee/tasks",
    read: false,
    createdAt: "2026-07-12T16:45:00"
  },
  {
    id: "NOTIF-101",
    userId: "MGR-001",
    title: "Pending Leave Request",
    message: "Bianca Antonio submitted a Vacation Leave request (Jul 20 - Jul 24).",
    link: "/manager/leave-approvals",
    read: false,
    createdAt: "2026-07-11T09:30:00"
  },
  {
    id: "NOTIF-102",
    userId: "MGR-001",
    title: "Task Submitted for Review",
    message: "Bianca Antonio submitted task 'Leave Flow Screenshots & Prototype' for your approval.",
    link: "/manager/tasks",
    read: false,
    createdAt: "2026-07-12T17:10:00"
  },
  {
    id: "NOTIF-103",
    userId: "MGR-001",
    title: "Task Submitted for Review",
    message: "Chloe Santos submitted task 'Attendance CSV Exporter Module' for review.",
    link: "/manager/tasks",
    read: false,
    createdAt: "2026-07-13T08:20:00"
  }
];

// Generate attendance history records for May, June, and July 2026
export function generateAttendanceSeed() {
  const records = [];
  const employees = INITIAL_USERS.filter(u => u.role === "employee" && u.isActivated);

  // June 2026 work days (Jun 1 to Jun 30, weekdays)
  const juneDates = [
    "2026-06-01", "2026-06-02", "2026-06-03", "2026-06-04", "2026-06-05",
    "2026-06-08", "2026-06-09", "2026-06-10", "2026-06-11", "2026-06-12",
    "2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19",
    "2026-06-22", "2026-06-23", "2026-06-24", "2026-06-25", "2026-06-26",
    "2026-06-29", "2026-06-30"
  ];

  // July 2026 work days up to July 13
  const julyDates = [
    "2026-07-01", "2026-07-02", "2026-07-03",
    "2026-07-06", "2026-07-07", "2026-07-08", "2026-07-09", "2026-07-10",
    "2026-07-13"
  ];

  // May 2026 sample dates for Bia (Total: 19, Present: 16, Late: 1, Absent: 2 as per test E-18)
  const mayDates = [
    "2026-05-04", "2026-05-05", "2026-05-06", "2026-05-07", "2026-05-08",
    "2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15",
    "2026-05-18", "2026-05-19", "2026-05-20", "2026-05-21", "2026-05-22",
    "2026-05-25", "2026-05-26", "2026-05-27", "2026-05-28"
  ];

  // Populate May for Bia specifically matching E-18 (19 records: 16 present, 1 late, 2 absent)
  mayDates.forEach((date, index) => {
    let status = "Present";
    let timeIn = "08:52 AM";
    let timeOut = "06:05 PM";
    let hours = "8.2";

    if (index === 6) { // May 12
      status = "Late";
      timeIn = "09:34 AM";
      hours = "7.5";
    } else if (index === 10 || index === 11) { // May 18, 19 (Sick Leave dates)
      status = "Absent";
      timeIn = "--";
      timeOut = "--";
      hours = "0";
    }

    records.push({
      id: `ATT-MAY-${index + 1}`,
      employeeId: "EMP-001",
      employeeName: "Bianca Allyzon P. Antonio",
      date,
      timeIn,
      timeOut,
      status,
      hoursWorked: hours
    });
  });

  // Populate June and July for all employees
  let attCounter = 100;
  [...juneDates, ...julyDates].forEach(date => {
    employees.forEach(emp => {
      let status = "Present";
      let timeIn = "08:55 AM";
      let timeOut = "06:00 PM";
      let hours = "8.0";

      // Inject realistic variance
      if (date === "2026-06-11" && emp.id === "EMP-001") {
        status = "Late";
        timeIn = "09:25 AM";
        hours = "7.6";
      } else if (date === "2026-06-24" && emp.id === "EMP-001") {
        status = "Absent";
        timeIn = "--";
        timeOut = "--";
        hours = "0";
      } else if (date === "2026-07-08" && emp.id === "EMP-002") {
        status = "Late";
        timeIn = "09:18 AM";
        hours = "7.7";
      }

      records.push({
        id: `ATT-${attCounter++}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date,
        timeIn,
        timeOut,
        status,
        hoursWorked: hours
      });
    });
  });

  return records;
}

export const INITIAL_ATTENDANCE = generateAttendanceSeed();
