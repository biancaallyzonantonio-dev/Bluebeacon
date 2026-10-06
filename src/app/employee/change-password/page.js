"use client";

import ChangePasswordForm from "@/components/common/ChangePasswordForm";

export default function EmployeeChangePasswordPage() {
  return (
    <div className="py-6 sm:py-10 px-4">
      <div className="max-w-xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0E2148] tracking-tight">
          Change Password
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update your employee portal password periodically to maintain account security.
        </p>
      </div>

      <ChangePasswordForm role="employee" />
    </div>
  );
}
