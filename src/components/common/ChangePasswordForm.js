"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEMS } from "@/context/EMSContext";
import { validatePassword } from "@/lib/utils";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

export default function ChangePasswordForm({ role = "employee" }) {
  const router = useRouter();
  const { currentUser, changePassword, logout } = useEMS();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Errors
  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordEvaluation = validatePassword(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentError("");
    setNewError("");
    setConfirmError("");

    let hasError = false;

    if (!currentPassword) {
      setCurrentError("Please enter your current password.");
      hasError = true;
    }

    if (!passwordEvaluation.isValid) {
      setNewError("Password does not meet the requirements.");
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords does not match. Please try again.");
      hasError = true;
    }

    if (hasError) return;

    // Call context to verify and update password
    const result = changePassword(currentUser?.id || "EMP-001", currentPassword, newPassword);

    if (!result.success) {
      setCurrentError(result.error);
      return;
    }

    setIsSuccess(true);
  };

  const handleProceedToLogin = () => {
    logout();
    router.push("/login?passwordChanged=true");
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto card-shadow animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-2xl font-bold text-[#0E2148] mb-2">Password Changed Successfully</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Your credentials have been securely updated in accordance with BlueBeacon EMS security standards. For safety, please sign in again with your new password.
        </p>
        <button
          type="button"
          onClick={handleProceedToLogin}
          className="w-full py-3.5 px-6 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-sm tracking-wider shadow-md transition-all"
        >
          PROCEED TO LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 card-shadow max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
        <div className="p-3 rounded-xl bg-blue-50 text-[#1644FE]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0E2148]">Change Account Password</h2>
          <p className="text-xs text-slate-500">
            Keep your account secure by using a unique password that meets all 5 rules.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Field 1: Current Password */}
        <div>
          <label
            htmlFor="currentPasswordInput"
            className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5"
          >
            Current Password
          </label>
          <div
            className={`relative flex items-center bg-[#F8FAFC] border rounded-xl px-3.5 py-2.5 transition-all ${
              currentError
                ? "border-rose-500 ring-2 ring-rose-100 bg-rose-50/50"
                : "border-slate-300 focus-within:border-[#1644FE] focus-within:ring-2 focus-within:ring-blue-100"
            }`}
          >
            <Lock className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              id="currentPasswordInput"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (currentError) setCurrentError("");
              }}
              placeholder="Enter your current password"
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-sm outline-none px-3"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {currentError && (
            <p className="mt-1 text-xs font-medium text-rose-600 animate-fadeIn">
              {currentError}
            </p>
          )}
        </div>

        {/* Field 2: New Password */}
        <div>
          <label
            htmlFor="newPasswordInput"
            className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5"
          >
            New Password
          </label>
          <div
            className={`relative flex items-center bg-[#F8FAFC] border rounded-xl px-3.5 py-2.5 transition-all ${
              newError
                ? "border-rose-500 ring-2 ring-rose-100 bg-rose-50/50"
                : "border-slate-300 focus-within:border-[#1644FE] focus-within:ring-2 focus-within:ring-blue-100"
            }`}
          >
            <Lock className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              id="newPasswordInput"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (newError) setNewError("");
              }}
              placeholder="Create a new secure password"
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-sm outline-none px-3"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {newError && (
            <p className="mt-1 text-xs font-medium text-rose-600 animate-fadeIn">
              {newError}
            </p>
          )}
        </div>

        {/* Live Requirement Checklist (SOP Section 7.10) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
          <span className="font-semibold text-slate-700 block mb-2">
            Password Requirements:
          </span>
          <ul className="space-y-1.5">
            {Object.entries(passwordEvaluation.rules).map(([key, rule]) => (
              <li
                key={key}
                className={`flex items-center gap-2 transition-colors ${
                  rule.met
                    ? "text-emerald-600 font-medium"
                    : newError
                    ? "text-rose-600 font-medium"
                    : "text-slate-500"
                }`}
              >
                {rule.met ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle
                    className={`w-4 h-4 shrink-0 ${
                      newError ? "text-rose-500" : "text-slate-400"
                    }`}
                  />
                )}
                <span>{rule.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Field 3: Confirm Password */}
        <div>
          <label
            htmlFor="confirmPasswordInput"
            className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5"
          >
            Confirm Password
          </label>
          <div
            className={`relative flex items-center bg-[#F8FAFC] border rounded-xl px-3.5 py-2.5 transition-all ${
              confirmError
                ? "border-rose-500 ring-2 ring-rose-100 bg-rose-50/50"
                : "border-slate-300 focus-within:border-[#1644FE] focus-within:ring-2 focus-within:ring-blue-100"
            }`}
          >
            <Lock className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              id="confirmPasswordInput"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmError) setConfirmError("");
              }}
              placeholder="Re-enter your new password"
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-sm outline-none px-3"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmError && (
            <p className="mt-1 text-xs font-medium text-rose-600 animate-fadeIn">
              {confirmError}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            {role === "manager" ? "UPDATE PASSWORD" : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
}
