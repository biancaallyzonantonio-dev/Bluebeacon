/**
 * BlueBeacon EMS Utility Helpers
 */

/**
 * Calculates working days (Monday to Friday) between two dates inclusive.
 * Skips Saturday (day 6) and Sunday (day 0).
 */
export function calculateWorkingDays(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 0;
  
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return 0;
  }
  
  let workingDays = 0;
  const cur = new Date(start);
  
  while (cur <= end) {
    const dayOfWeek = cur.getDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
    cur.setDate(cur.getDate() + 1);
  }
  
  return workingDays;
}

/**
 * Formats date into readable string like "Jul 13, 2026" or "July 13, 2026"
 */
export function formatDate(dateStr, style = "short") {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const options = {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  };
  return d.toLocaleDateString("en-US", options);
}

/**
 * Checks if target date is at least 2 days ahead of the anchor date.
 */
export function isAtLeastTwoDaysAhead(dateStr, anchorDateStr = "2026-07-13") {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  const anchor = new Date(anchorDateStr);
  
  if (isNaN(target.getTime()) || isNaN(anchor.getTime())) return false;
  
  // Set both to midnight for accurate day comparison
  target.setHours(0, 0, 0, 0);
  anchor.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - anchor.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 2;
}

/**
 * Universal browser CSV exporter
 * Resolves Defect D-12: Produces actual downloadable CSV file.
 */
export function exportToCSV(data, filename = "export.csv", columns = null) {
  if (!data || !data.length) {
    console.warn("No data available to export");
    return false;
  }

  // Determine headers
  const headers = columns || Object.keys(data[0]).map(key => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1)
  }));

  const csvRows = [];
  
  // Header row
  csvRows.push(headers.map(col => `"${(col.label || col.key).replace(/"/g, '""')}"`).join(","));

  // Body rows
  for (const row of data) {
    const values = headers.map(col => {
      let val = row[col.key];
      if (val === null || val === undefined) {
        val = "";
      } else if (typeof val === "object") {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return true;
}

/**
 * Password Policy Validator (5 mandatory rules)
 * SOP Requirement:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export function validatePassword(password = "") {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const isValid = minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  return {
    isValid,
    rules: {
      minLength: { label: "At least 8 characters", met: minLength },
      uppercase: { label: "One uppercase letter", met: hasUppercase },
      lowercase: { label: "One lowercase letter", met: hasLowercase },
      number: { label: "One number", met: hasNumber },
      specialChar: { label: "One special character", met: hasSpecialChar }
    }
  };
}

/**
 * Helper to download or preview mock evidence files (Defect D-13)
 */
export function downloadFile(filename, content = "Mock file content from BlueBeacon EMS evidence") {
  const blob = new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
