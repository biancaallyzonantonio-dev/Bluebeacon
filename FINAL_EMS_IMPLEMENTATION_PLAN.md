# BlueBeacon Employee Management System (EMS)
## Comprehensive Architectural & Implementation Master Plan

**Document Reference:** Based on `ANTONIO__BIANCA-BLUBEACON_EMS_SOP.md` (SOP-EMS-001, Rev 1.1)  
**Standardized Target Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS · React Context / LocalStorage Store  
**Scope:** Dual-Portal Unification (Employee Portal & Department Manager Portal), Design Harmonization, and Defect Remediation (D-01 through D-17).

---

## 1. Executive Summary & Vision

The BlueBeacon Employee Management System (EMS) is a centralized web platform designed to streamline human resource workflows across two primary user groups: **Employees** and **Department Managers**. 

Previously, the system existed as two fragmented prototype files (`bluebeacon-employee.html` and `bluebeacon-department-manager.html`) with noticeable design drift, divergent seed data, and 17 recorded defects (Appendix A of the SOP). This Master Plan establishes a unified, production-grade Next.js application that:
1. **Unifies the Portals:** Consolidates Employee and Manager workflows under a shared component library and routing hierarchy with role-aware layouts.
2. **Remediates All 17 Appendix A Defects:** Solves every identified vulnerability and functional gap (D-01 through D-17), ensuring a 100% pass rate across the 91 test cases (55 Employee + 36 Manager).
3. **Harmonizes Design & Brand:** Implements a single design token system (Midnight Navy, Royal Cobalt, Crisp Card Surfaces, consistent status pills, and accessible custom controls) eliminating the visual disjoint between portals.
4. **Delivers Real Reactive State:** Features an in-memory & `localStorage`-synced reactive store where employee submissions (tasks, leaves, profile updates) immediately reflect in real-time on the manager's queues and vice versa.

---

## 2. "Grill-Me" Deep-Dive: Critical Architectural Interrogations & Resolutions

Applying the relentless grill-me methodology, we examined every edge case, contradictory requirement, and architectural vulnerability present in the SOP. Below are the key tension points and their definitive architectural resolutions.

### 2.1 State Synchronization & Role Concurrency (The D-16 Trap)
* **The Vulnerability:** Prototype tests revealed conflicting records: Bia's email was `bapantonio@...` in Employee vs. `bapaantonio@...` in Manager; leave type was Vacation vs. Sick; and "today" fluctuated between July 10 and July 13, 2026.
* **Architectural Resolution:**
  - Introduce `src/data/seed-data.js` as the immutable master seed source.
  - Fix the simulation anchor date to **Monday, July 13, 2026** (or dynamic system date with fallback anchor) so 2-day advance notice calculations and month filters align identically across both views.
  - Implement a unified client-side state provider (`EMSContext`) backed by `localStorage` and a `BroadcastChannel` (or storage events) so opening the Employee portal in one tab and the Manager portal in another demonstrates instant reactive synchronization without page reloads.

### 2.2 Dual-Portal Authentication & Onboarding Architecture (D-01 & D-07)
* **The Vulnerability:** The manager portal skipped authentication entirely and opened straight into Andrei's dashboard, with logout rendering a dead prototype message.
* **Architectural Resolution:**
  - Build a single, robust Authentication module (`/login`, `/activate`, `/update-account`) shared by both roles.
  - Add a frictionless **"Quick Switch Demo Account"** drawer on the login screen, allowing evaluators to instantly sign in as **Bianca Antonio (Employee, EMP-001)**, **Andrei Vance (Department Manager, MGR-001)**, or test a newly issued account awaiting activation.
  - Wire `/logout` to properly wipe the active session state, reset navigation history, and redirect to `/login`.

### 2.3 Password Security & Verification Integrity (D-02)
* **The Vulnerability:** The Manager build permitted changing the password without verifying the current password.
* **Architectural Resolution:**
  - Implement a single cryptographic/credential verification helper `verifyCurrentPassword(userId, inputPassword)`.
  - Display inline field-level validation: red border highlighting with the exact SOP message `"Current password is incorrect. Please try again."`
  - Replicate the live 5-rule password checklist (8+ chars, uppercase, lowercase, number, special char) turning green dynamically on keystroke across both portals.

### 2.4 Destructive Action Safeguards (D-03 & D-11)
* **The Vulnerability:** Manager announcement deletion and unfeaturing occurred instantly without confirmation dialogs.
* **Architectural Resolution:**
  - Construct a reusable `ConfirmModal` dialog component with high-contrast warning cues, accessible focus trap (`Esc` to cancel, `Enter` to confirm), and exact modal text matching the SOP reference designs.

### 2.5 Responsive Layout & Navigation Collapse (D-04)
* **The Vulnerability:** Manager portal broke on viewports $\le 1024\text{px}$, generating over 1300px of horizontal overflow due to a non-collapsing sidebar.
* **Architectural Resolution:**
  - Implement a mobile-first responsive layout.
  - On viewports $< 1024\text{px}$ (tablet and mobile), collapse the fixed sidebar into an off-canvas drawer accessed via a floating/header hamburger trigger.
  - Ensure zero horizontal scroll (`overflow-x: hidden` on viewport roots, scrollable tables wrapped in touch-friendly container cards).

### 2.6 The 4-Gate Task Submission & Evidence Pipeline (Procedure 7.6 & D-13)
* **The Vulnerability:** Task submission requires 4 strict gates: (1) all checklist items checked, (2) $\ge 1$ evidence document uploaded, (3) valid project link, and (4) 100% progress. In the manager build, evidence download icons were unclickable.
* **Architectural Resolution:**
  - Build a strict validation engine in `TaskDetailDrawer`: disable the "Submit for Review" button and show `"Cannot be submitted. Requirements/Progress incomplete."` until all 4 criteria evaluate to true.
  - On submit, transition task status to `Waiting Review` and freeze employee edits (read-only mode).
  - Implement browser-native blob download / object URL generation for task evidence files so managers can click the download icon (D-13) and inspect submitted work.

### 2.7 Leave Policy Engine & Working Days Calculation (Procedure 7.8, 8.4, D-10)
* **The Vulnerability:** 2-day advance notice rules were often hardcoded; number of days calculation counted weekends; Year filter in Manager Leave Approvals had no effect.
* **Architectural Resolution:**
  - Date picker enforces `minDate = today + 2 days` (disable all preceding calendar dates).
  - Working days algorithm: iterates through `[startDate, endDate]`, omitting Saturdays and Sundays.
  - Connect Year filter in both portals to calculate dynamic summary counts (Total, Vacation, Sick, Pending) and filter table rows.

---

## 3. Standardized Design System & Aesthetics

In accordance with modern web design best practices and the `frontend-design` principles, we eliminate the previous aesthetic divergence (Inter vs. Plus Jakarta Sans, rounded vs. squircle cards, mismatched blues).

```
                      BLUEBEACON DESIGN TOKEN SYSTEM
==========================================================================
 Brand Navy       : #0E2148  (Deep Executive Sidebar & High-level headings)
 Primary Cobalt   : #1644FE  (Interactive accents, active links, primary CTA)
 Surface Tint     : #F5F8FC  (Main viewport canvas background)
 Card Surface     : #FFFFFF  (High-elevation containers, crisp borders)
 Table Header     : #E8EEFA  (Subtle cool tint for table headers)
 Accent Border    : #E2E8F0  (Hairline clean structural boundaries)
==========================================================================
 Status Emerald   : #10B981  (Approved, Present, Completed)
 Status Amber     : #F59E0B  (Pending, Late, In Progress, Waiting Review)
 Status Rose      : #EF4444  (Rejected, Absent, Overdue, Validation Errors)
 Status Indigo    : #6366F1  (Assigned, Featured Announcement)
==========================================================================
 Typography       : Plus Jakarta Sans / Inter, weights 400, 500, 600, 700
 Geometry         : 12px card radius, 6px pill radius, 8px button radius
```

### Component Standards
1. **Interactive Form Fields:** Clean inputs with transition borders. When invalid, border turns `border-rose-500` with an animated inline error message `<p className="text-xs text-rose-600 mt-1">` directly underneath the field.
2. **Custom Date Picker:** Calendar popup with month navigation and quick year dropdown. Automatically greys out weekends for leave selection and blocks dates $< 2$ days out.
3. **Slide-Over Drawers:** Right-aligned slide-over panels for Task Details, Leave Requests, and Employee Profile with backdrop blur and smooth CSS transitions.
4. **Accessible Modals:** Center-staged dialogs for Announcement Details, Delete Confirmations, and Image Previews.

---

## 4. Complete System Architecture & Directory Structure

```
my-app/
├── public/
│   ├── brand/
│   │   └── bluebeacon-logo.svg       # Normalized SVG vector logo
│   └── samples/                      # Sample attachments and mock assets
├── src/
│   ├── app/
│   │   ├── globals.css               # Core CSS tokens & custom scrollbars
│   │   ├── layout.js                 # Global HTML shell & Font injection
│   │   ├── page.js                   # Root landing / Smart redirect to /login
│   │   ├── (auth)/
│   │   │   ├── login/page.js         # Unified Login + Quick Switcher
│   │   │   ├── activate/page.js      # Account Activation (EMP-xxx + Email)
│   │   │   └── update-account/page.js# First-Login Password & Username setup
│   │   ├── employee/
│   │   │   ├── layout.js             # Employee shell (Sidebar, Header, Search)
│   │   │   ├── dashboard/page.js     # Procedure 7.4
│   │   │   ├── attendance/page.js    # Procedure 7.5 (Filters, CSV export)
│   │   │   ├── tasks/page.js         # Procedure 7.6 (Checklist, Upload, 4 gates)
│   │   │   ├── announcements/page.js # Procedure 7.7 (Acknowledge, Categories)
│   │   │   ├── leave/page.js         # Procedure 7.8 (Working days, 2-day gate)
│   │   │   ├── profile/page.js       # Procedure 7.9 (Read-only + Editable)
│   │   │   └── change-password/page.js# Procedure 7.10 (5-rule verification)
│   │   └── manager/
│   │   │   ├── layout.js             # Manager shell (Off-canvas mobile sidebar)
│   │   │   ├── dashboard/page.js     # Procedure 8.1 (Approval cues & stats)
│   │   │   ├── employees/page.js     # Procedure 8.2 (Roster, Drawer, Export)
│   │   │   ├── attendance/page.js    # Procedure 8.2 (Dept attendance, CSV export)
│   │   │   ├── tasks/page.js         # Procedure 8.3 (Assign, Review, Controls)
│   │   │   ├── leave-approvals/page.js# Procedure 8.4 (Policy checks, Notes)
│   │   │   ├── announcements/page.js # Procedure 8.5 (Post, Confirm Modals)
│   │   │   ├── profile/page.js       # Procedure 8.6
│   │   │   └── change-password/page.js# Procedure 8.6 (Verified current password)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Sidebar.js            # Unified responsive navigation
│   │   │   ├── Topbar.js             # Notification bell, profile chip, search
│   │   │   ├── StatCard.js           # Metric summary card
│   │   │   ├── StatusPill.js         # Standardized status badge
│   │   │   ├── ConfirmModal.js       # Delete / Unfeature confirm modal
│   │   │   ├── DatePicker.js         # Custom accessible calendar
│   │   │   └── NotificationPanel.js  # Live notifications drawer/dropdown
│   │   ├── employee/
│   │   │   ├── TaskDetailDrawer.js   # 4-requirement submission engine
│   │   │   ├── LeaveRequestDrawer.js # Leave form with working day counter
│   │   │   └── AnnouncementModal.js  # Read & Acknowledge modal
│   │   └── manager/
│   │   │   ├── TaskReviewDrawer.js   # Manager progress slider & revision tools
│   │   │   ├── CreateTaskDrawer.js   # New task assignment
│   │   │   ├── LeaveReviewDrawer.js  # Policy check inspection & approval notes
│   │   │   └── EmployeeDetailDrawer.js# Tabbed Profile (Contact, Tasks, Leaves)
│   ├── context/
│   │   └── EMSContext.js             # Reactive central store with localStorage
│   ├── data/
│   │   └── seed-data.js              # Single Source of Truth database
│   └── lib/
│       ├── utils.js                  # Working days calculator, date formatters
│       ├── csv-export.js             # Universal client-side CSV generator
│       └── validation.js             # Password rule evaluator, email checker
```

---

## 5. Comprehensive Module Specifications

### 5.1 Authentication, Activation & Session Flow
* **Login (`/login`):**
  - Accepts Username or Company Email + Password.
  - Password visibility toggle (eye icon).
  - "Remember me" option.
  - Validation: Displays specific errors for `"Invalid Username or Email. Please check your credentials and try again."` and `"Incorrect Password. Please try again."`
  - Demo Account Switcher: Provides instant one-click login for Bianca (Employee) and Andrei (Manager).
* **Account Activation (`/activate`):**
  - Validates `Employee ID` format (`EMP-xxx`) and verified `@bluebeacon.com` email against active HR records.
  - Error states: `"Employee ID not found. Please check your Employee ID and try again."` or `"Please enter a valid company email address."`
  - Success screen: Displays confirmation card with `"CHECK YOUR EMAIL"` action routing back to login.
* **First Login Transition (`/update-account`):**
  - Triggered automatically when an employee with `isFirstLogin === true` logs in.
  - Enforces username change ($\ge 4$ characters) and new password satisfying the 5 rules.
* **Change Password (`/employee/change-password` & `/manager/change-password`):**
  - Requires Current Password verification against stored credentials (**fixes D-02**).
  - Displays dynamic requirement checklist turning green per rule.
  - Re-authentication redirect upon successful update.

### 5.2 Dashboards & Quick Navigation
* **Employee Dashboard:**
  - **Currently Working On:** Live cards for active in-progress tasks with due dates and completion bars.
  - **Monthly Snapshot:** Days present this month, pending tasks count, leave balance.
  - **Latest Announcement:** Pinned featured notice with quick modal preview.
  - **Notification Panel (**fixes D-05**):** Interactive bell dropdown showing task reviews, leave status updates, and announcement pings with "Mark all as read".
  - **Profile Menu (**fixes D-06**):** Accessible avatar dropdown linking to My Profile, Change Password, and Logout.
* **Manager Dashboard:**
  - **Needs Your Approval:** Urgent pending leave requests badge counter and queue table.
  - **Department Snapshot:** Metric cards for Total Employees, Present Today, Tasks Waiting Review, and Overdue Tasks.
  - **Tasks Waiting on You:** High-priority review items with one-click drawer inspection.
  - Fully wired notification bell and profile chip.

### 5.3 Attendance Management & CSV Export
* **Employee View:**
  - Summary metrics: Total Days, Present, Late, Absent.
  - Dynamic Month and Status filter dropdowns.
  - Working CSV Export (**fixes D-12**): Generates standard `attendance-YYYY-MM.csv` containing Date, Time In, Time Out, Status, and Working Hours.
  - Friendly empty state for months with zero logs.
* **Department Manager View:**
  - Department-wide attendance log.
  - Filters by Month, specific Employee, and Attendance Status.
  - Manager-grade CSV export downloading filtered department logs.

### 5.4 Task Management & Evidence Pipeline
* **Employee View (`/employee/tasks`):**
  - Five status tabs: All, In Progress, Waiting Review, Completed, Overdue.
  - Search by task name and description; sort by due date and priority.
  - **Task Submission Engine:**
    - Dynamic Checklist: Checking items recalculates progress percentage in real time.
    - Evidence Upload: File drop zone supporting PDF, PNG, JPG up to 100MB with delete capability.
    - Project Link: URL validator for Figma / GitHub links.
    - Gate Evaluator: Validates all 4 requirements before enabling "Submit for Review".
    - Once submitted: Switches to `Waiting Review` and locks the form into read-only mode.
* **Manager View (`/manager/tasks`):**
  - "New Task" drawer: Assign to any employee, set title, description, priority (Low, Medium, High), due date, and line-by-line checklist.
  - Review Drawer: Real-time progress slider adjustments, "Send Reminder" toast trigger, and evidence attachment download trigger (**fixes D-13**).
  - Approval Workflow: "Approve Submission" changes status to `Completed` and notifies the employee; "Request Revision" returns status to `In Progress` with manager feedback.

### 5.5 Leave Management & Policy Compliance
* **Employee View (`/employee/leave`):**
  - Summary balance cards: Vacation, Sick, Emergency, Total Used.
  - History table with Year and Status filters.
  - **Filing Engine:**
    - Leave types: Vacation, Sick, Birthday, Emergency, Maternity, Paternity.
    - Date restriction: Enforces $\ge 2$ business days advance filing (disables prior dates).
    - Working Days Calculator: Automatically skips Saturdays and Sundays.
    - Reason validation: Required field, capped at 500 characters.
    - Optional document attachment (medical certificates, etc.) up to 5MB.
    - Ability to cancel pending requests before manager review.
* **Manager View (`/manager/leave-approvals`):**
  - Pending requests highlighted at the top.
  - Working Year filter (**fixes D-10**) and Status filter.
  - **Policy Checks Inspection:** Live validation badges checking:
    1. Filed $\ge 2$ days in advance? (Pass/Fail)
    2. Within remaining leave credits? (Pass/Fail)
    3. Absence $\le 3$ consecutive days? (Pass/Fail)
    4. No conflicting project deadlines in interval? (Pass/Fail)
  - Action Controls: "Approve" (automatically deducts from employee's balance), "Reject", and "Decide Later" with optional 500-char manager notes.

### 5.6 Announcement Hub
* **Employee View (`/employee/announcements`):**
  - Featured Announcement hero card.
  - Category list with counter badges (clicking a category filters the table - **fixes D-14**).
  - Sort by Newest First, Oldest First, Category.
  - "Acknowledge" button in details modal: sets acknowledged state and disables button with visual confirmation.
* **Manager View (`/manager/announcements`):**
  - Post Announcement modal with audience targeting and optional "Set as featured" toggle.
  - "Feature / Unfeature" toggle protected by confirmation dialog (**fixes D-11**).
  - "Delete" action protected by explicit confirmation modal (**fixes D-03**).
  - Detailed reach metrics (number of employees viewed & acknowledged).

### 5.7 Profile, Emergency Contacts & Personal Details
* **Shared Profile Experience (`/employee/profile` & `/manager/profile`):**
  - Overview Card with employee avatar, role badge, department, and ID.
  - Read-only HR fields: Full Name, Employee ID, Position, Department, Date Hired, Employment Type. Clicking displays informative toast: `"Can't edit HR-maintained employment records."`
  - Editable Personal Fields: Date of Birth (custom year-navigation calendar), Gender, Civil Status, Nationality, Phone Number, Address, Emergency Contact Name & Phone.
  - Validation: Enforces phone number format and required fields with red outlines (**fixes D-08**).
  - Reversion on Cancel: Clicking Cancel restores last-saved state (**fixes D-09**).
* **Manager Employee Inspection Drawer (**fixes D-15**):**
  - Comprehensive tabbed drawer in `/manager/employees`:
    - Tab 1: Personal & Contact Information
    - Tab 2: Recent Attendance Log
    - Tab 3: Current & Completed Tasks
    - Tab 4: Leave History & Balance

---

## 6. Appendix A Defect Remediation Blueprint

Every single defect from Appendix A is assigned an exact architectural solution and verification rule:

| ID | Area | Defect Summary | Resolution Strategy & Implementation | Verification Test |
|---|---|---|---|---|
| **D-01** | Auth | Manager build lacks login/onboarding | Shared `/login`, `/activate`, `/update-account` flow with role detection. | Test M-01 |
| **D-02** | Security | Manager change password ignores current pw | Strict verification against active user credentials with inline red error. | Test M-33 |
| **D-03** | Safety | Delete announcement has no confirmation | Reusable `ConfirmModal` dialog ("Are you sure you want to delete?"). | Test M-26 |
| **D-04** | UI/UX | Manager pages overflow on mobile/tablet | Off-canvas drawer navigation + hamburger trigger for screens $< 1024\text{px}$. | Responsive Audit |
| **D-05** | UX | Manager notification bell inactive | Interactive notification panel with "Mark all as read" and clear actions. | Test M-03 |
| **D-06** | UX | Manager profile chip inactive | Dropdown menu linking to Profile, Change Password, and Logout. | Test M-04 |
| **D-07** | Session | Manager logout renders prototype toast | Complete session reset, clearing local state and navigating to `/login`. | Test M-35 |
| **D-08** | Forms | Manager profile saves empty phone | Inline form validation flagging empty required fields with red outline. | Test M-30 |
| **D-09** | Forms | Manager profile Cancel doesn't revert | Form reset handler resetting state to stored profile snapshot. | Test M-31 |
| **D-10** | Filters | Manager Leave year filter has no effect | Filter hook filtering requests by `year(startDate) === selectedYear`. | Test M-21 |
| **D-11** | Safety | Unfeature announcement lacks confirmation | Confirmation modal ("Remove from featured announcements?"). | Test M-25 |
| **D-12** | Data | Manager export only shows toast | Universal client-side CSV generator triggering standard file download. | Test M-09 |
| **D-13** | Tasks | Task evidence download icon inactive | Dynamic Blob URL generator downloading evidence files. | Test M-19 |
| **D-14** | Filters | Manager category rows not clickable | Click handler on category pill filtering active announcement list. | Test M-24 |
| **D-15** | UI/UX | Discrepancy between drawer and tabbed profile | Tabbed Employee Detail Drawer (Contact, Attendance, Tasks, Leaves). | Test M-10 |
| **D-16** | Data | Cross-role sample data mismatch | Single source of truth `seed-data.js` unifying emails, dates, and IDs. | Data Audit |
| **D-17** | Data | Status vocabulary mismatch | Standardized status dictionary shared across both role portals. | Data Audit |

---

## 7. Phased Implementation Roadmap

### Phase 1: Foundation, Design Tokens & Unified Seed Store
* Initialize design tokens in `src/app/globals.css` (Midnight Navy, Cobalt, surfaces, borders).
* Create `src/data/seed-data.js` with harmonized users, attendance history, tasks, leaves, and announcements (**resolving D-16 and D-17**).
* Build `src/context/EMSContext.js` providing full CRUD operations, role switching, and `localStorage` persistence.
* Implement reusable utility functions: `calculateWorkingDays()`, `formatDate()`, `generateCSV()`, `validatePassword()`.

### Phase 2: Unified Authentication & Onboarding
* Build `/login` with username/email login, password toggle, validation errors, and a Quick Switch Demo Account bar.
* Build `/activate` with Employee ID and Company Email validation and confirmation card.
* Build `/update-account` for first-login credential setup with live 5-rule password checklist.
* Build `/employee/change-password` and `/manager/change-password` with current password verification (**resolving D-01, D-02, D-07**).

### Phase 3: Employee Portal Implementation
* Build `/employee/layout.js` with responsive sidebar, topbar search, notification bell (**E-15, E-16**), and profile menu (**E-17**).
* Implement `/employee/dashboard`: Active tasks, monthly summary stats, latest announcement card.
* Implement `/employee/attendance`: Monthly attendance cards, month/status filters, CSV export (**E-21**).
* Implement `/employee/tasks`: Status tabs, search/sort, `TaskDetailDrawer` with 4-gate submission verification (**E-27, E-28**).
* Implement `/employee/announcements`: Hero featured announcement, category filter pills, modal details with "Acknowledge" button (**E-30–E-33**).
* Implement `/employee/leave`: Leave cards, history table, `LeaveRequestDrawer` with 2-day gate and working day calculation (**E-34–E-42**).
* Implement `/employee/profile`: Overview card, read-only HR tooltips, editable form with inline validation and cancel reversion (**E-43–E-48**).

### Phase 4: Department Manager Portal Implementation
* Build `/manager/layout.js` with off-canvas mobile drawer navigation (**resolving D-04**), active topbar bell (**resolving D-05**), and profile chip (**resolving D-06**).
* Implement `/manager/dashboard`: "Needs Your Approval" queue, department snapshot cards, tasks waiting review.
* Implement `/manager/employees`: Roster table, filters, CSV export (**resolving D-12**), tabbed `EmployeeDetailDrawer` (**resolving D-15**).
* Implement `/manager/attendance`: Department attendance records, filters, CSV export.
* Implement `/manager/tasks`: Assigned task table, "New Task" drawer, `TaskReviewDrawer` with slider controls, approval/revision buttons, and evidence download (**resolving D-13**).
* Implement `/manager/leave-approvals`: Prioritized pending table, working Year filter (**resolving D-10**), policy check evaluation, approval notes.
* Implement `/manager/announcements`: Post announcement form, confirmation modals for Delete (**resolving D-03**) and Unfeature (**resolving D-11**), category filter (**resolving D-14**).
* Implement `/manager/profile`: Personal profile with inline validation (**resolving D-08**) and working Cancel reversion (**resolving D-09**).

### Phase 5: Complete Appendix A Verification & Quality Audit
* Execute automated and manual checks against all **55 Employee Test Cases (E-01 to E-55)**.
* Execute automated and manual checks against all **36 Manager Test Cases (M-01 to M-36)**.
* Verify 100% resolution of all **17 Defect Items (D-01 to D-17)**.
* Perform responsive viewport audits at 375px (iPhone), 768px (iPad portrait), 1024px (iPad landscape), and 1440px (Desktop), confirming zero horizontal scroll.

### Phase 6: Final Polish & Delivery
* Refine micro-interactions (button hover states, drawer slide easing, active status badges).
* Optimize build bundle and verify clean Next.js production build (`npm run build`).
* Package complete documentation and deliver to user.

---

## 8. Verification & Acceptance Criteria

The implementation is considered complete only when:
1. **Zero Defect Backlog:** All defects D-01 through D-17 are fully resolved and verified.
2. **100% Test Case Compliance:** All 91 test cases pass cleanly without workarounds or mocked errors.
3. **Responsive Parity:** Neither the Employee nor the Manager portal displays horizontal page overflow at 375px or 768px.
4. **Data Coherence:** Both portals draw from and write to the same coherent data store with zero discrepancies in dates, IDs, or leave records.
5. **Aesthetic Excellence:** Both portals exhibit a consistent, high-end enterprise aesthetic with unified colors, typography, and custom UI controls.
