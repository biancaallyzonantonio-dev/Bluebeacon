# BlueBeacon Employee Management System

**STANDARD OPERATING PROCEDURE**
User Operation — Employee and Department Manager

**Document No.:** SOP-EMS-001 · **Revision:** 1.1 · **Effective:** September 28, 2026

| | Name | Position | Signature | Date |
|---|---|---|---|---|
| **Prepared by** | Bianca Allyzon P. Antonio | | | September 28, 2026 |
| **Reviewed by** | | | | |
| **Approved by** | | | | |

> This document is controlled electronically. Printed copies are uncontrolled; verify the revision before use.

*Note: Screenshots and figures from the PDF are not reproduced here; figure captions are kept in italics for reference.*

---

## Contents

1. Purpose
2. Scope
3. Roles and Responsibilities
4. Definitions
5. References
6. General Requirements
7. Procedures — Employee
   - 7.1 Activate an Employee Account
   - 7.2 Complete the First Login
   - 7.3 Log In and Log Out
   - 7.4 Use the Dashboard, Notifications and Profile Menu
   - 7.5 View Attendance Records
   - 7.6 Complete and Submit a Task
   - 7.7 Read and Acknowledge Announcements
   - 7.8 File and Track a Leave Request
   - 7.9 Update Personal Information
   - 7.10 Change Password
8. Procedures — Department Manager
   - 8.1 Review the Manager Dashboard
   - 8.2 Monitor Employees and Attendance
   - 8.3 Create, Assign and Review Tasks
   - 8.4 Approve or Reject Leave Requests
   - 8.5 Manage Announcements
   - 8.6 Update Profile and Change Password
9. Troubleshooting
10. Records
- Appendix A — Comparative UI Test Report

---

## 1 Purpose

This SOP defines how employees and department managers use the BlueBeacon Employee Management System (EMS). It covers account activation, attendance, tasks, announcements, leave, and profile and password maintenance, so that every user completes these activities the same way and company records stay accurate and secure.

## 2 Scope

This SOP applies to all BlueBeacon employees and department managers who use the EMS web application. It covers the Employee portal and the Department Manager portal. System administration, payroll processing and HR record maintenance are out of scope.

## 3 Roles and Responsibilities

| Role | Responsibilities |
|---|---|
| Employee | Activates their account, keeps credentials confidential, records task progress with evidence, files leave in line with policy, and keeps personal information current. |
| Department Manager | Assigns and reviews tasks, approves or rejects leave, monitors attendance, and publishes department announcements. |
| Human Resources | Issues Employee IDs and company emails, and maintains read-only employment records (name, position, department, date hired, employment type). |
| System Administrator | Maintains the EMS, resets credentials on request, and resolves access problems. |

## 4 Definitions

| Term | Definition |
|---|---|
| EMS | BlueBeacon Employee Management System. |
| Employee ID | Unique identifier issued by HR, format EMP-000. |
| Default credentials | System-generated username and password emailed after activation; replaced at first login. |
| Task evidence | Files and project links that prove a task was completed. |
| Submission requirements | All checklist items done, at least one document uploaded, a project link provided, and 100% progress. |
| Waiting Review | Task status after submission, until the manager approves it or requests a revision. |
| Approval checks | Policy checks shown to the manager for each leave request. |
| Featured announcement | The announcement pinned at the top of the Announcement page and Dashboard. |
| Working days | Monday to Friday; used to count the number of leave days. |

## 5 References

- EMS UI design (Figma): *EMS Bianca Antonio*.
- Appendix A: Comparative UI Test Report, September 28, 2026.
- Builds covered: `bluebeacon-employee.html` and `bluebeacon-department-manager.html`.

## 6 General Requirements

| Item | Requirement |
|---|---|
| Access | A current web browser (Chrome, Edge, Firefox or Safari) on a desktop, tablet or phone. |
| Credentials | Personal and confidential. Never share your password or leave a session unattended; log out when finished. |
| Password policy | At least 8 characters · one uppercase letter · one lowercase letter · one number · one special character. |
| Leave filing | At least 2 days in advance. Reason required (maximum 500 characters). Attachment optional: PDF, JPG or PNG, up to 5 MB. |
| Task evidence | PDF, JPG, PNG or FIG files, up to 100 MB each, plus a project link. |
| Record corrections | Read-only employment data is corrected through Human Resources only. |

---

## 7 Procedures — Employee

### 7.1 Activate an Employee Account

| | |
|---|---|
| **Purpose** | Register a newly hired employee in the EMS and trigger delivery of default login credentials. |
| **Performed by** | New employee |
| **Prerequisites** | Employee ID issued by Human Resources (for example, EMP-001). Active BlueBeacon company email address. |

1. On the Login page, click **Activate your account**.
   **Result:** The Activate Your Account page opens.
   *Figure 1. Activate Account page*
2. Enter your Employee ID in **Employee ID**.
3. Enter your company email (ending in @bluebeacon.com) in **Company Email**.
4. Click **ACTIVATE ACCOUNT**.
   **Result:** The system verifies both values against company records and shows the Account Activated confirmation.
   *Figure 2. Account activated confirmation*
5. Click **CHECK YOUR EMAIL**.
   **Result:** The Login page opens. Your default username and password are sent to your company email.

**Validation messages**

| Message shown | Cause | Corrective action |
|---|---|---|
| Employee ID not found. Please check your Employee ID and try again. | The Employee ID is not in the company records. | Re-enter the ID exactly as issued by HR, then click **ACTIVATE ACCOUNT** again. |
| Please enter a valid company email address. | The email is not a company address, or does not belong to the Employee ID. | Enter the @bluebeacon.com address registered to your Employee ID. |

*Figure 3. Employee ID not found · Figure 4. Invalid company email*

### 7.2 Complete the First Login

| | |
|---|---|
| **Purpose** | Replace the default credentials with a personal username and password before first use of the system. |
| **Performed by** | Newly activated employee |
| **Prerequisites** | Account activated (Procedure 7.1). Default username and password received by company email. |

1. On the Login page, enter the default username and password, then click **LOGIN**.
   **Result:** Because this is the first login, the Update Your Account page opens automatically.
   *Figure 5. Update Your Account page*
2. Enter a **New Username** of at least 4 characters.
3. Enter a **New Password**. Watch the Password Requirements list; each rule turns green when it is met.
4. Re-enter the same password in **Confirm Password**.
5. Click **SAVE CHANGES**.
   **Result:** The credentials are saved and the Dashboard opens. Use the new credentials for every later login.

**Validation messages**

| Message shown | Cause | Corrective action |
|---|---|---|
| Password does not meet the requirements. | One or more password rules are not met. Unmet rules are shown in red. | Change the password until every rule is green. |
| Passwords does not match. Please try again. | Confirm Password differs from New Password. | Re-type the same password in both fields. |
| Username must be at least 4 characters. | The new username is too short. | Enter a username of 4 or more characters. |

> **Password policy:** at least 8 characters · one uppercase letter · one lowercase letter · one number · one special character.

*Figure 6. Password does not meet requirements · Figure 7. Passwords do not match*

> **Note:** Click **CANCEL** to leave without saving. You will return to the Login page and must complete this procedure at the next login.

### 7.3 Log In and Log Out

| | |
|---|---|
| **Purpose** | Access the EMS securely and end the session when work is complete. |
| **Performed by** | Employee |
| **Prerequisites** | Personal credentials set (Procedure 7.2). |

**Log in**

1. Enter your username or company email in **Username or Email**.
2. Enter your password. Click the eye icon to show or hide it.
3. Optional: tick **Remember me** on a personal device.
4. Click **LOGIN**.
   **Result:** The Dashboard opens.
   *Figure 8. Login page*

**Log out**

1. Click the logout icon at the bottom of the sidebar, or open the Profile menu and select **Logout**.
   **Result:** The session ends and the Login page opens.

**Validation messages**

| Message shown | Cause | Corrective action |
|---|---|---|
| Invalid Username or Email. Please check your credentials and try again. | The username or email is not registered. | Check for typing errors and re-enter the registered username or email. |
| Incorrect Password. Please try again. | The password does not match the account. | Re-enter the password. If forgotten, click **Forgot Password?** and contact the administrator. |

*Figure 9. Invalid username or email · Figure 10. Incorrect password*

### 7.4 Use the Dashboard, Notifications and Profile Menu

| | |
|---|---|
| **Purpose** | Review daily work status and reach other modules from one place. |
| **Performed by** | Employee |

1. After logging in, review the Dashboard. It shows **Currently Working On** (active tasks), a weekly snapshot (days present this month and open tasks), and the **Latest Announcement**.
   *Figure 11. Employee Dashboard*
2. Click a task row to open its details, or click **View All Tasks**.
3. Click a snapshot card to open Attendance or My Tasks, or click **View All Announcements**.

**Notifications**

1. Click the bell icon in the top bar. A red dot on the bell means there are unread notifications.
   **Result:** The notification list opens; unread items have a blue dot.
   *Figure 12. Notification panel*
2. Click a notification to open the related page.
   **Result:** The notification is marked as read.
3. Click **Mark all as read** to clear every unread indicator.

**Profile menu and search**

1. Click your name in the upper-right corner.
   **Result:** The menu shows My Profile, Change Password and Logout.
   *Figure 13. Profile menu*
2. To search, type in the sidebar **Search** box. Results include pages, tasks, announcements and leave requests. Click a result, or press Enter to open the first one.

### 7.5 View Attendance Records

| | |
|---|---|
| **Purpose** | Check attendance for a month and obtain a copy of the records. |
| **Performed by** | Employee |

1. In the sidebar, click **Attendance**.
   **Result:** Summary cards show Total, Present, Late and Absent days for the selected month, above the Attendance History table.
   *Figure 14. Attendance Record page*
2. Open the **Month** dropdown and select a month.
   **Result:** The cards and table refresh for that month.
3. Open the **Status** dropdown and select All Status, Present, Late or Absent.
   **Result:** Only matching rows are shown.
   *Figure 15. Month filter · Figure 16. Status filter*
4. Click **EXPORT**.
   **Result:** A CSV file (for example, `attendance-2026-06.csv`) of the rows currently shown is downloaded. It opens in Excel or Google Sheets.

### 7.6 Complete and Submit a Task

| | |
|---|---|
| **Purpose** | Record progress on an assigned task and submit it, with evidence, for manager review. |
| **Performed by** | Employee |
| **Prerequisites** | Task assigned by the Department Manager. |

| Status | Meaning |
|---|---|
| In Progress | Assigned and being worked on. |
| Waiting Review | Submitted; the manager has not yet decided. Read-only. |
| Completed | Approved by the manager. |
| Overdue | Past the due date and not submitted. |

**Find the task**

1. In the sidebar, click **My Tasks**.
   **Result:** Status cards and the Assigned Tasks table are shown. Click a card to filter by that status.
   *Figure 17. My Tasks page*
2. Use **Status**, **Search Task** and **Sort By** to narrow the list. Click **Refresh** to clear all filters.
   *Figure 18. Task status filter*
3. Click **View Details** on the task.
   **Result:** The Details panel opens on the right.

**Complete and submit**

1. Tick each **Check List** item as it is finished.
   **Result:** The completion percentage updates.
2. Under **Task Evidence**, drag files onto the upload area or click it to browse. Accepted: PDF, JPG, PNG, up to 100 MB each. Remove a file with the trash icon.
3. Click **ADD LINK**, paste the Figma or project URL, and click **Add**.
4. Check that all four **Submission Requirements** are green.
   **Result:** Until then, Submit for Review is disabled and the panel shows "Cannot be submitted. Requirements/Progress incomplete."
   *Figure 19. In-progress task: submission blocked until requirements are met*
5. Click **Submit for Review**.
   **Result:** The status changes to Waiting Review and the panel becomes read-only. After the manager approves it, the status becomes Completed.
   *Figure 20. Submitted task (read-only)*

### 7.7 Read and Acknowledge Announcements

| | |
|---|---|
| **Purpose** | Stay informed of company notices and confirm that important notices have been read. |
| **Performed by** | Employee |

1. In the sidebar, click **Announcement**.
   **Result:** The featured announcement, the Announcement Categories list and All Announcements are shown. Unopened items carry a **New** badge.
   *Figure 21. Announcement page*
2. To narrow the list, click a category, type in **Search Announcement**, or choose Newest First, Oldest First or Category in **Sort by**.
   *Figure 22. Sort by options*
3. Click **View Details**.
   **Result:** The details window shows the ID, author, effective date, audience, category, description and expected impact.
   *Figure 23. Announcement details window*
4. Click **Acknowledge** to confirm you have read it, then click **Close**.

### 7.8 File and Track a Leave Request

| | |
|---|---|
| **Purpose** | Apply for leave and monitor the approval status. |
| **Performed by** | Employee |

> **Leave policy:** File leave at least **2 days in advance**. The reason is required (maximum 500 characters). An attachment is optional: PDF, JPG or PNG, up to 5 MB.

**File a request**

1. In the sidebar, click **Leave Request**, then click **New Request**.
   **Result:** The New Leave Request panel opens.
   *Figure 24. Leave Request page with the New Leave Request panel*
2. Select the **Leave Type**: Vacation, Sick, Birthday, Emergency, Maternity or Paternity Leave.
   *Figure 25. Leave Type dropdown*
3. Click **Start Date** and pick the first day, then click **End Date** and pick the last day. Dates less than 2 days from today are disabled.
   *Figure 26. Date calendar*
4. Check **Number of Days**. It is calculated automatically and counts working days only.
   *Figure 27. Number of days calculated from the selected dates*
5. Enter the **Reason**, and attach a supporting document if needed.
6. Click **Submit Request**.
   **Result:** The request appears in Leave Request History with status Pending. Click **CANCEL** to close without submitting.

**Track a request**

1. Use **Status** (Approved, Rejected, Pending) and **Year** to filter the history. The summary cards follow the selected year.
   *Figure 28. Status filter · Figure 29. Year filter*
2. Click **View Details** to see the full request. To withdraw a pending request, click **Cancel Request**.

**Validation messages**

| Message shown | Cause | Corrective action |
|---|---|---|
| Please select a leave type. | No leave type chosen. | Select a leave type. |
| Please select your start and end date. | A date is missing; Number of Days stays at 0. | Pick both dates from the calendar. |
| Please enter a reason for your leave. | Reason is empty. | Enter the reason. |
| Can't submit. Please fill the required requirements. | Shown with any error above; Submit is disabled. | Correct the fields marked in red. |

*Figure 30. No leave type selected · Figure 31. No dates selected · Figure 32. Number of days not calculated · Figure 33. No reason entered*

### 7.9 Update Personal Information

| | |
|---|---|
| **Purpose** | Keep personal and emergency-contact details current. |
| **Performed by** | Employee |

1. In the sidebar, click **Personal Information**, or select **My Profile** in the Profile menu.
   **Result:** Profile Overview and Personal Details are shown.
   *Figure 34. Personal Profile page*
2. Update the editable fields: Date of Birth, Gender, Civil Status, Nationality, Phone Number, Address and Emergency Contact.
3. For **Date of Birth**, click the field and pick a date. Click the month title to jump to another year.
   *Figure 35. Birthdate calendar · Figure 36. Gender dropdown*
4. Optional: click the camera icon on the avatar to upload a profile photo.
5. Click **SAVE CHANGES**.
   **Result:** A confirmation message appears and the overview card updates. Click **CANCEL** to discard unsaved changes.

**Validation messages**

| Message shown | Cause | Corrective action |
|---|---|---|
| Please enter your … (for example, phone number, address, civil status) | A required field is empty. | Complete every field marked in red, then click **SAVE CHANGES** again. |
| Please enter a valid phone number. | The phone number format is invalid. | Enter digits, with an optional leading +. |

*Figure 38. Required-field validation*

### 7.10 Change Password

| | |
|---|---|
| **Purpose** | Update the account password periodically or when it may be compromised. |
| **Performed by** | Employee |

1. In the sidebar, click **Change Password**.
   *Figure 39. Change Password page*
2. Enter your **Current Password**.
3. Enter a **New Password** that meets every rule, and re-enter it in **Confirm Password**.
4. Click **SAVE CHANGES**.
   **Result:** The Password Changed page appears.
   *Figure 40. Password changed confirmation*
5. Click **PROCEED TO LOGIN** and log in with the new password.
   **Result:** The old password no longer works.

**Validation messages**

| Message shown | Cause | Corrective action |
|---|---|---|
| Current password is incorrect. Please try again. | The current password is wrong. | Re-enter your existing password. |
| Password does not meet the requirements. | A rule is not met (shown in red). | Adjust the new password until every rule is green. |
| Passwords does not match. Please try again. | Confirm Password differs. | Re-type the same new password. |

*Figure 41. Incorrect current password · Figure 42. Password does not meet requirements · Figure 43. Passwords do not match*

---

## 8 Procedures — Department Manager

### 8.1 Review the Manager Dashboard

| | |
|---|---|
| **Purpose** | Identify items that need action today: pending leave, tasks awaiting review, and overdue work. |
| **Performed by** | Department Manager |

1. Log in. The Dashboard opens with **Needs Your Approval**, which lists pending leave requests. The number of pending requests also appears as a red badge on **Leave Approvals**.
   *Figure 44. Department Manager Dashboard*
2. Scroll down to review the department snapshot (employees, present today, waiting review, overdue), **Tasks waiting on you** and the **Latest announcement**.
   *Figure 45. Dashboard, scrolled*
3. Click **View Details** on a leave row (Procedure 8.4) or a task row (Procedure 8.3).
   *Figure 46. Leave request details from the Dashboard · Figure 47. Task details from the Dashboard*

**Notifications and profile menu**

> **Known issue:** The approved design includes a notification panel and a profile menu, shown below. In the current manager build, the bell and the name chip are not yet active (defects D-05 and D-06, Appendix A).

*Figure 48. Manager notification panel (reference design) · Figure 49. Notifications cleared (reference design) · Figure 50. Manager profile menu (reference design)*

### 8.2 Monitor Employees and Attendance

| | |
|---|---|
| **Purpose** | Review the department roster, today's attendance and attendance history. |
| **Performed by** | Department Manager |

**Employees**

1. In the sidebar, click **Employees**.
   **Result:** Cards show Total Employees, Present Today, On Leave and Absent Today, above the Department Employees table.
   *Figure 51. Employees page*
2. Filter with **Search Employee** (name, ID or position), **Position** and **Status**.
   *Figure 52. Employee filters*
3. Click **View Details** to open Employee Details: contact information, recent attendance, assigned tasks and leave history. From there, click **Assign a Task** or **Full Attendance**.
   *Figure 53. Employee Details panel*
4. Click **EXPORT** to export the list.
   *Figure 54. Export confirmation*

**Attendance**

1. In the sidebar, click **Attendance**. Filter by **Month**, **Employee** and **Status**, then click **EXPORT** if needed.
   **Result:** The cards and the Attendance History table follow the filters.
   *Figure 55. Department Attendance Record*

### 8.3 Create, Assign and Review Tasks

| | |
|---|---|
| **Purpose** | Assign work to employees, track progress and approve completed submissions. |
| **Performed by** | Department Manager |

**Find tasks**

1. In the sidebar, click **Task Management**.
   **Result:** Cards show Assigned, In Progress, Waiting Review, Completed and Overdue, above the Assigned Tasks table.
   *Figure 58. Task Management page*
2. Filter with **Search Task**, **Assigned To**, **Status** and **Sort By**.
   *Figure 59. Task filters*

**Create and assign a task**

1. Click **New Task**.
   **Result:** The New Task panel opens.
   *Figure 60. New Task panel*
2. Enter the **Task Name** (required) and **Description**, then select the employee in **Assign To**.
   *Figure 61. Assign To*
3. Set the **Due Date** and **Priority**, and enter the **Check List** with one item per line. Optionally add reference files.
   *Figure 62. Due date, priority and checklist*
4. Click **Create & Assign**.
   **Result:** The task appears with status Assigned, and the employee sees it on My Tasks.

**Review a task**

1. Click **View Details** on the task.
   **Result:** The panel shows the assignee, dates, priority, checklist and evidence.
   *Figure 63. Task details*
2. Scroll to **Manager Controls**. Change the status or drag the progress slider, then click **Save Changes**. Click **Send a Reminder** to prompt the employee.
   *Figure 64. Task details, scrolled: Manager Controls*
3. For a task in Waiting Review, click **Approve Submission** (status becomes Completed and the task is locked) or **Request Revision** (status returns to In Progress).

### 8.4 Approve or Reject Leave Requests

| | |
|---|---|
| **Purpose** | Decide on employee leave requests in line with department policy. |
| **Performed by** | Department Manager |

1. In the sidebar, click **Leave Approvals**. Pending requests are listed first. Filter with **Search Request** and **Status**.
   *Figure 65. Leave Approvals page*
2. Click **View Details** on a request.
   **Result:** The Leave Request panel shows the employee, dates, number of days, filing date, reason and attachment.
   *Figure 66. Leave request details*
3. Review the **Approval Checks**: filed at least 2 days in advance; within remaining leave credits; absence of 3 days or shorter; no task deadlines inside the leave dates.
4. Optional: enter a note for the employee (maximum 500 characters).
   *Figure 67. Approval checks and note*
5. Click **Approve**, **Reject** or **Decide Later**.
   **Result:** Approving deducts the days from the employee's leave balance. The decision and note are shown to the employee, and the pending badge count decreases.

### 8.5 Manage Announcements

| | |
|---|---|
| **Purpose** | Publish department notices and control which one is featured. |
| **Performed by** | Department Manager |

1. In the sidebar, click **Announcement**.
   **Result:** The featured announcement, categories and All Announcements list are shown. Each item has Feature or Unfeature, Delete and View Details.
   *Figure 68. Manager Announcement page*
2. Scroll to review older announcements, their audience and how many employees have seen each one.
   *Figure 69. Announcement list, scrolled*
3. To post, click **New Announcement**. Enter the title and message (both required, message maximum 500 characters), choose the category, date and audience, and optionally tick **Set as the featured announcement**. Click **Post Announcement**.
   **Result:** The announcement is listed first and shown to the chosen audience.
   *Figure 70. New Announcement panel*
4. Click **View Details** to see reach and to set or remove the featured status.
   *Figure 71. Announcement details*

**Unfeature or delete**

> **Caution:** Deleting is permanent. In the current build, **Delete** and **Unfeature** take effect **immediately without a confirmation dialog** (D-03, D-11). Check the announcement before clicking. The approved confirmation dialogs are shown below.

*Figure 72. Delete confirmation (reference design) · Figure 73. Unfeature confirmation (reference design)*

### 8.6 Update Profile and Change Password

| | |
|---|---|
| **Purpose** | Maintain personal details and account security. |
| **Performed by** | Department Manager |

**Personal information**

1. In the sidebar, click **Personal Information**, edit the available fields, and click **SAVE CHANGES**. Employment details are read-only.
   *Figure 74. Manager Personal Profile*

**Change password**

1. In the sidebar, click **Change Password**. Enter the current password, a new password that meets every listed rule, and the confirmation.
   **Result:** The requirement list turns green as each rule is met, and a message confirms whether the two new passwords match.
   *Figure 75. Manager Change Password*
2. Click **UPDATE PASSWORD**.

---

## 9 Troubleshooting

| Situation | Action |
|---|---|
| Forgot password | Click **Forgot Password?** on the Login page and contact the System Administrator. |
| Cannot activate account | Confirm the Employee ID and company email with HR; both must match company records. |
| A profile field cannot be edited | The field is HR-maintained (read-only). Request the correction from HR. |
| Submit for Review is disabled | Open the task and complete every Submission Requirement: checklist, file, project link and 100% progress. |
| A leave date cannot be selected | Dates less than 2 days from today are blocked by policy. Choose a later date or contact your manager. |
| Unexpected behaviour on the Manager portal | Check Appendix A for known defects before reporting a new issue. |

## 10 Records

| Record | Created by | Location |
|---|---|---|
| Attendance history and CSV exports | System / Employee | Attendance module; downloaded CSV files |
| Task evidence and approvals | Employee / Manager | Task Details panel |
| Leave requests, decisions and notes | Employee / Manager | Leave Request and Leave Approvals modules |
| Announcement acknowledgements | Employee | Announcement module |

---

## Appendix A — Comparative UI Test Report

Both role interfaces were tested in Google Chrome (headless) at 1440 × 1024, with responsive checks at 375 px and 768 px. There are 91 test cases: 55 Employee and 36 Department Manager.

| Employee tests passed | Manager tests passed | Open defects | Design attributes matching |
|---|---|---|---|
| 55/55 | 23/36 | 17 (4 high) | 7/21 |

### A.1 Open Defects

| ID | Severity | Test | Area | Finding | Recommendation |
|---|---|---|---|---|---|
| D-01 | High | M-01 | Login & onboarding | The manager build has no Login, Activate Account or first-login Update Account screens; the file opens straight on the dashboard. | Reuse the Employee auth screens (same layout and validation) for managers. |
| D-02 | High | M-33 | Change Password | Any value is accepted as the current password, so the password can be changed without knowing it. | Verify the current password and show the inline "Current password is incorrect" error used on the Employee side. |
| D-03 | High | M-26 | Announcement | Delete removes an announcement immediately, with no confirmation or undo. The manual (Figure 15.2) documents a confirmation dialog. | Add the "Are you sure you want to delete?" dialog with Cancel / Delete. |
| D-04 | High | Responsive | All manager pages | Horizontal page overflow on every manager page: 1346px at 375px width and 953px at 768px. The sidebar becomes a top bar whose menu row does not scroll inside its own box. | Use the Employee pattern: an offcanvas sidebar behind a hamburger button below 1024px. |
| D-05 | Medium | M-03 | Dashboard | The notification bell does nothing when clicked. The manual (Figures 11.2–11.3) documents a notification panel with Mark all as read and Clear all. | Wire the bell to a notification panel (the Employee panel can be reused). |
| D-06 | Medium | M-04 | Dashboard | The profile name chip does nothing. The manual (Figure 11.4) documents My Profile / Pending Approvals / Log Out. | Add the profile menu. |
| D-07 | Medium | M-35 | Session | Logout shows "This is a prototype — logout isn't wired up yet." | Return to the Login page. |
| D-08 | Medium | M-30 | Personal Information | Save accepts an empty Phone Number and reports "Profile changes saved." | Validate required fields inline (red field + message), as on the Employee side. |
| D-09 | Medium | M-31 | Personal Information | Cancel shows "Changes discarded." but leaves the edited values in the form. | Restore the last saved values on Cancel. |
| D-10 | Medium | M-21 | Leave Approvals | The Year filter has no effect; its value is never used when filtering the table. | Filter the table and summary cards by the selected year. |
| D-11 | Medium | M-25 | Announcement | Unfeature takes effect immediately. The manual (Figure 15.3) documents a confirmation dialog. | Add the confirmation dialog, or update the manual to match. |
| D-12 | Low | M-09 | Employees / Attendance | EXPORT only shows a toast; no file is downloaded. The Employee Attendance export downloads a CSV. | Generate and download a CSV of the filtered rows. |
| D-13 | Low | M-19 | Task Management | The download icon on task evidence files has no action. | Download the file, or show a clear message. |
| D-14 | Low | M-24 | Announcement | Rows in Announcement Categories are not clickable; on the Employee side, clicking a row filters the list. | Make category rows filter the list (the Category dropdown already works). |
| D-15 | Low | Doc | Employees | The manual (Figures 12.4–12.5) shows an Employee Profile page with Personal / Attendance tabs. The build opens a single Employee Details drawer instead. | Either build the tabbed profile or replace those two figures. |
| D-16 | Low | Data | Cross-role | Shared sample data disagrees: Bia's email is bapantonio@… (Employee) vs bapaantonio@… (Manager); "today" is Jul 10 vs Jul 13, 2026; Bia's Jul 20–21 leave is Vacation (Employee) vs Sick (Manager). | Use one shared seed dataset for both roles. |
| D-17 | Low | Parity | Status vocabulary | The manager uses statuses the employee side lacks: task "Assigned" and attendance "On Leave". An employee cannot filter for them. | Align status lists across both roles. |

### A.2 Defects Fixed in the Employee Build

| Test | Issue and resolution |
|---|---|
| E-15 | Notification panel was hidden behind the dashboard card (stacking order). **Fixed:** the top bar now sits above page content. |
| E-41 | Typing the reason and then clicking Submit Request on the leave form did nothing on the first click (the form re-rendered on blur). **Fixed:** the reason field now updates in place. |

### A.3 UI Design Comparison

| Attribute | Employee | Department Manager | Match | Note |
|---|---|---|---|---|
| Typeface | Inter | Plus Jakarta Sans | Differs | Different fonts make the two portals look like separate products. |
| Logo | Raster logo (from Figma) | Hand-drawn SVG approximation | Differs | The manager logo is a hand-drawn SVG that only approximates the brand mark. |
| Sidebar color | #0D2352 | #0E2148 | Same | Visually identical navy. |
| Primary blue | #1644FE | #1B4FD8 | Differs | Two blues are in use; pick one token. |
| Active menu item | #1E4FBC, radius 6px | #1B4FD8, radius 11px, glow | Differs | Same idea, different shape. |
| Menu label size | 20px | 17px | Differs | |
| Sidebar search | radius 12px | radius 30px (pill) | Differs | |
| Page title | 34px, #1A2233 | 34px, #0E2148 | Same | Same size. |
| Card corners / shadow | 8px, stronger shadow | 16px, soft shadow + border | Differs | The manager cards are rounder and flatter. |
| Page background | #F7F9FE | #F5F9FE | Same | |
| Table header | #E8EEFC, 13px | #E8EEFA, 14px | Same | Same tint. |
| Status pills | radius 3px, 8px text | radius 6px, 11.5px text | Differs | Colors match (green/amber/red/purple); size and shape differ. |
| Dropdowns | Custom styled menus (as in Figma) | Native `<select>` (15 on page) | Differs | Native menus look different on every OS and ignore the Figma style. |
| Date pickers | Custom calendar with year view | Browser date input | Differs | |
| Validation feedback | Red field + message under it | Toast message only | Differs | The manager side never highlights the field at fault. |
| Detail views | Drawer (tasks, leave form) + modal (announcement, leave) | Drawer for everything | Differs | |
| Auth / password screens | Full-page split layout with photo | No auth screens; password is an in-app card | Differs | |
| Mobile navigation | Off-canvas sidebar + hamburger | Sidebar stacked on top, menu row overflows | Differs | See D-04. |
| Stat cards | Icon circle + label + big colored number | Same anatomy | Same | Consistent. |
| Task drawer content | Checklist, evidence, submission requirements | Same sections + Manager Controls | Same | Consistent. |
| Password rules | 5 rules | Same 5 rules | Same | Consistent. |

### A.4 Functional Parity

| Capability | Employee | Department Manager | Defects |
|---|---|---|---|
| Login / activation / first login | Yes | No | D-01 |
| Dashboard overview | Tasks, attendance, latest announcement | Pending approvals, dept snapshot, tasks waiting, latest announcement | |
| Notifications | Panel, open item, mark all read | Bell does nothing | D-05 |
| Profile menu | My Profile / Change Password / Logout | Does nothing | D-06 |
| Attendance | Own records; month + status filters; CSV export | Whole department; month + employee + status; export toast only | D-12 |
| Tasks | Complete checklist, upload evidence, add link, submit | Create & assign, change status/progress, approve / request revision, remind | |
| Leave | File request with validation, 2-day notice, cancel pending | Approval checks, note, approve / reject / decide later | D-10 |
| Announcements | Read, filter, sort, acknowledge | Post, feature/unfeature, delete, view reach | D-03, D-11, D-14 |
| Personal information | Inline validation, read-only notices, cancel reverts, photo upload | No validation, cancel does not revert | D-08, D-09 |
| Change password | Current password verified, inline errors, success page | Current password not verified, toasts only | D-02 |
| Global search | Pages, tasks, announcements, leave | Employees only (Enter) | |
| Logout | Returns to Login | Not wired | D-07 |

### A.5 Responsive Check

| Role | Width | Pages checked | Pages overflowing | Max overflow |
|---|---|---|---|---|
| Employee | 375 px | 8 | 0 | 0 px |
| Employee | 768 px | 8 | 0 | 0 px |
| Manager | 375 px | 8 | 8 | 1346 px |
| Manager | 768 px | 8 | 8 | 953 px |

### A.6 Test Cases — Employee

| ID | Module | Test and expected result | Actual result | Result |
|---|---|---|---|---|
| E-01 | Login | Login page renders. Login form, Username/Email and Password fields, LOGIN button | Form and fields rendered | PASS |
| E-02 | Login | Unregistered username shows error. Username field turns red with "Invalid Username or Email" message | Error shown: "Invalid Username or Email. Please check your credentials and try again." | PASS |
| E-03 | Login | Wrong password shows error. Password field turns red with "Incorrect Password" message | Password error: "Incorrect Password. Please try again."; username field not flagged | PASS |
| E-04 | Login | Show/hide password toggle. Eye icon switches the password field between hidden and visible | type: password → text → password | PASS |
| E-05 | Activation | Activate Account page opens from Login. Activate Your Account form with Employee ID and Company Email | Activation form shown | PASS |
| E-06 | Activation | Unknown Employee ID rejected. Employee ID field red, "Employee ID not found" message | "Employee ID not found. Please check your Employee ID and try again." | PASS |
| E-07 | Activation | Non-company email rejected. Company Email field red, "Please enter a valid company email address" | "Please enter a valid company email address." | PASS |
| E-08 | Activation | Valid details activate the account. Account Activated confirmation with green check | Confirmation page shown | PASS |
| E-09 | Activation | "Check your email" returns to Login. Login page with a toast confirming credentials were emailed | Login shown; toast "Default credentials sent to bapantonio@bluebeacon.com" | PASS |
| E-10 | First login | Default credentials open Update Account. First login redirects to Update Your Account | Update Your Account shown | PASS |
| E-11 | First login | Weak password rejected with unmet rules in red. New Password red; unmet requirements highlighted | Unmet: One special character | PASS |
| E-12 | First login | Mismatched confirmation rejected. Confirm Password red with "Passwords does not match" | "Passwords does not match. Please try again." | PASS |
| E-13 | First login | Valid new credentials open the Dashboard. Credentials saved, user lands on Dashboard | Title "Welcome back, Bia!" | PASS |
| E-14 | Dashboard | Dashboard counts match module data. Active tasks, open tasks and days present agree with My Tasks / Attendance | "You have 5 active tasks" (In Progress tasks = 5) | PASS |
| E-15 | Dashboard | Notification panel. Bell opens a notification list; clicking an item opens its page and marks it read | 5 notifications; clicked item → leave page, marked read | PASS |
| E-16 | Dashboard | Mark all as read clears the bell badge. Badge dot disappears after "Mark all as read" | Badge removed | PASS |
| E-17 | Dashboard | Profile menu. Name menu shows My Profile and Logout; My Profile opens Personal Information | Items: My Profile / Change Password / Logout; My Profile → profile | PASS |
| E-18 | Attendance | Attendance page and summary cards. Total / Present / Late / Absent cards add up to the table | Cards 19/16/1/2; 19 rows | PASS |
| E-19 | Attendance | Month filter. Choosing a month refreshes cards and table for that month | All rows are May 2026 | PASS |
| E-20 | Attendance | Status filter. Choosing Late shows only Late rows | 1 rows, all "Late" | PASS |
| E-21 | Attendance | Export downloads a file. EXPORT saves a CSV of the filtered records | Downloaded attendance-2026-06.csv | PASS |
| E-22 | Attendance | Empty month. A month with no records shows an empty-state message | "No attendance records for September 2026." | PASS |
| E-23 | My Tasks | My Tasks page. Five status cards and the assigned task table | 5 cards, 9 tasks | PASS |
| E-24 | My Tasks | Status filter. Choosing Completed lists only Completed tasks | 2 rows, all Completed | PASS |
| E-25 | My Tasks | Search and sort. Search narrows by name; "Task name" sort orders A–Z | Search → 5 matches (name or description); sort A–Z correct | PASS |
| E-26 | My Tasks | Submitted task is read-only. Waiting Review task shows files and links; checklist cannot be changed | Checklist unchanged (9); button "Submitted for Review" | PASS |
| E-27 | My Tasks | In-progress task blocks early submission. Submit is disabled with "Cannot be submitted" until all requirements are met | Disabled; "Cannot be submitted. Requirements/Progress incomplete." | PASS |
| E-28 | My Tasks | Complete checklist, upload evidence, add link, submit. After all 4 requirements are met the task is submitted and becomes Waiting Review | Submit enabled: true; new status Waiting Review | PASS |
| E-29 | My Tasks | Overdue task flagged. Past-due unfinished task shows Overdue status and "days overdue" | Announcement Page — Create and publish the announcement page for internal updates. Jul 5, 20… | PASS |
| E-30 | Announcement | Announcement page. Featured card, category counts and full list | Featured ✓, 4 categories, 6 items | PASS |
| E-31 | Announcement | Sort By. Oldest First reverses the date order | Dates ascending | PASS |
| E-32 | Announcement | Category filter and search. Clicking a category or typing filters the list | General → 2 items; "payroll" → 1 item | PASS |
| E-33 | Announcement | Announcement details and Acknowledge. Details window with metadata and impact; Acknowledge disables itself | Modal opened; acknowledged | PASS |
| E-34 | Leave Request | Leave page and New Request form. Summary cards, history table and New Leave Request panel | Form panel opened | PASS |
| E-35 | Leave Request | Status filter. Approved shows only approved requests | 6 rows, all Approved | PASS |
| E-36 | Leave Request | Year filter. Choosing 2025-2026 shows only that year's requests and updates the cards | 2 rows from 2025; Total card = 2 | PASS |
| E-37 | Leave Request | Leave Type dropdown. Six leave types to choose from | 6 options | PASS |
| E-38 | Leave Request | Date calendar enforces 2-day notice. Calendar opens; dates before today+2 are disabled | Jul 11 disabled: true; Jul 12 enabled: true | PASS |
| E-39 | Leave Request | Number of days auto-calculates. Picking Jul 20–24 fills "5 day(s)" (weekdays only) | "5day(s)" | PASS |
| E-40 | Leave Request | Required-field validation. Missing type, dates or reason blocks submission with a red message per field | Type/date/reason errors shown; Submit blocked | PASS |
| E-41 | Leave Request | Valid request is submitted. New Pending row appears; Pending card increases by 1 | Pending 1 → 2; card shows 2 | PASS |
| E-42 | Leave Request | View Details and cancel a pending request. Details window opens; Cancel Request removes it | Details opened; request cancelled | PASS |
| E-43 | Personal Information | Profile page. Overview card and editable Personal Details form | Rendered | PASS |
| E-44 | Personal Information | Read-only fields. Clicking a locked field shows "Can't edit …" and the value cannot change | 7 "Can't edit" messages; name unchanged | PASS |
| E-45 | Personal Information | Birthdate calendar. Calendar opens with year view; picking a date fills the field | Field now "June 15, 2005" | PASS |
| E-46 | Personal Information | Gender dropdown. Male / Female options; selection shown | Selected "Male" | PASS |
| E-47 | Personal Information | Required-field validation. Empty required fields turn red with messages; nothing is saved | 3 fields flagged; stored phone unchanged | PASS |
| E-48 | Personal Information | Cancel reverts, valid Save persists. Cancel restores values; Save updates the overview and notifies | Cancel restored "+63 123 456 7890"; saved phone shown in overview | PASS |
| E-49 | Change Password | Change Password page. Current / New / Confirm fields with requirements list | Rendered | PASS |
| E-50 | Change Password | Wrong current password. Current Password red with "Current password is incorrect" | "Current password is incorrect. Please try again." | PASS |
| E-51 | Change Password | Password rules enforced. New password missing a special character is rejected and the rule shown in red | Unmet: One special character | PASS |
| E-52 | Change Password | Confirmation must match. Confirm Password red with "Passwords does not match" | "Passwords does not match. Please try again." | PASS |
| E-53 | Change Password | Successful change and re-login. Password Changed page; old password no longer works, new one does | Old password rejected; new password logs in | PASS |
| E-54 | Session | Logout. Sidebar logout returns to Login | Returned to Login | PASS |
| E-55 | Global | Sidebar search. Typing a task name lists matches; selecting opens it | 1 result(s); opened TSK-2026-018 | PASS |

### A.7 Test Cases — Department Manager

| ID | Module | Test and expected result | Actual result | Result |
|---|---|---|---|---|
| M-01 | Login | Login / first-login flow. Manager signs in before reaching the dashboard (same flow as Employee) | No login screen; file opens directly on "Welcome back, Andrei!" | FAIL |
| M-02 | Dashboard | Dashboard renders. Pending leave approvals, department snapshot, tasks waiting, latest announcement | 3 pending leaves, 4 stat cards, 2 tasks waiting | PASS |
| M-03 | Dashboard | Notification panel. Bell opens a notification list with Mark all as read / Clear all | Nothing happens — bell has no click handler | FAIL |
| M-04 | Dashboard | Profile menu. Name chip opens My Profile / Pending Approvals / Log Out | Nothing happens — chip has no click handler | FAIL |
| M-05 | Dashboard | Leave request details from Dashboard. Drawer shows employee, dates, reason, attachment, approval checks, Approve / Reject / Decide Later | Footer: Approve Reject Decide Later | PASS |
| M-06 | Dashboard | Task details from Dashboard. Drawer shows checklist, evidence, requirements and manager controls | Drawer opened with controls | PASS |
| M-07 | Employees | Employees page. Summary cards and department employee table | 4 cards, 8 employees | PASS |
| M-08 | Employees | Position / Status / search filters. Filters narrow the employee table | Web Designer → 1; "dizon" → 1 | PASS |
| M-09 | Employees | Export downloads a file. EXPORT saves the employee list (Employee side downloads a CSV) | Toast "Employee list exported as CSV." only — no file is produced | FAIL |
| M-10 | Employees | Employee details. Drawer with contact, recent attendance, tasks and leave history | Drawer opened (single scrolling panel, no Personal/Attendance tabs) | PASS |
| M-11 | Employees | "Full Attendance" shortcut. Opens Attendance filtered to that employee | Filtered to Bia Antonio | PASS |
| M-12 | Attendance | Attendance filters. Month, Employee and Status filters update cards and table | 19 Late rows | PASS |
| M-13 | Task Management | Task Management page. Five status cards and assigned task table | 5 cards, 10 tasks | PASS |
| M-14 | Task Management | Assigned To / Status filters. Filtering by employee shows only their tasks | Bia Antonio → 2 tasks | PASS |
| M-15 | Task Management | New Task validation. Create & Assign without a name is blocked | Blocked: "Give the task a name first." | PASS |
| M-16 | Task Management | Create and assign a task. New task appears as Assigned for the chosen employee | Leave Flow Screenshots — Capture updated screenshots for the manual. BA Bia Antoni… | PASS |
| M-17 | Task Management | Task details, save progress. Changing progress with the slider and saving updates the row | Row shows 60% | PASS |
| M-18 | Task Management | Approve a submitted task. Waiting Review → Completed | Status Completed | PASS |
| M-19 | Task Management | Evidence file download. Download icon saves the employee's evidence file | Nothing happens — no handler | FAIL |
| M-20 | Leave Approvals | Leave page. Summary cards and history table, pending first | 4 cards; first row Pending | PASS |
| M-21 | Leave Approvals | Year filter. Choosing 2025-2026 changes the table (Employee side does) | Table unchanged — year value is never used in the filter | FAIL |
| M-22 | Leave Approvals | Approve with a note. Approving sets status, deducts leave balance and updates the nav badge | Approved; balance 9→7; badge 3→2 | PASS |
| M-23 | Announcement | Announcement page. Featured card, categories, list with Feature / Delete / View Details | 5 announcements | PASS |
| M-24 | Announcement | Category filter by clicking a category row. Clicking "General" in Announcement Categories filters the list (as on Employee side) | No effect — rows are not clickable (dropdown filter works instead) | FAIL |
| M-25 | Announcement | Unfeature asks for confirmation. A confirmation dialog appears before removing the featured flag | Unfeatured immediately, no dialog ("Removed from featured.") | FAIL |
| M-26 | Announcement | Delete asks for confirmation. "Are you sure you want to delete?" dialog with Cancel / Delete | Deleted immediately — no confirmation, no undo | FAIL |
| M-27 | Announcement | Announcement details. Details panel with date, author, audience and reach | Drawer opened | PASS |
| M-28 | Announcement | Post a new announcement. Empty post blocked; valid post added to the list | Empty → "Add a title so people know what it's about."; new post listed first | PASS |
| M-29 | Personal Information | Profile page. Overview and editable form (same layout as Employee) | Rendered | PASS |
| M-30 | Personal Information | Required-field validation on Save. Clearing Phone and saving shows a red error (as on Employee side) | Accepted empty phone: "Profile changes saved." | FAIL |
| M-31 | Personal Information | Cancel reverts edits. Cancel restores the saved values | Toast "Changes discarded." but field stays empty | FAIL |
| M-32 | Change Password | Change Password page. Current / New / Confirm with live requirement checklist | Rendered (in-app card, not the full-page layout used for Employees) | PASS |
| M-33 | Change Password | Current password is verified. A wrong current password is rejected | Any current password is accepted: "Password updated." | FAIL |
| M-34 | Change Password | Rules and confirmation enforced. Weak or mismatched passwords are blocked | Both blocked (toast messages only — fields not highlighted) | PASS |
| M-35 | Session | Logout. Logout returns to a Login page | "This is a prototype — logout isn't wired up yet." | FAIL |
| M-36 | Global | Sidebar search. Enter searches employees | 1 match on Employees page | PASS |
