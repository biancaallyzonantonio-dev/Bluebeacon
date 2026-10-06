"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEMS } from "@/context/EMSContext";
import BlueBeaconLogo from "@/components/common/BlueBeaconLogo";
import { validatePassword } from "@/lib/utils";
import { User, Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

export default function UpdateAccountPage() {
  const router = useRouter();
  const { currentUser, completeFirstLogin } = useEMS();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const passwordEvaluation = validatePassword(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setConfirmError("");

    let hasError = false;

    if (!newUsername.trim() || newUsername.trim().length < 4) {
      setUsernameError("Username must be at least 4 characters.");
      hasError = true;
    }

    if (!passwordEvaluation.isValid) {
      setPasswordError("Password does not meet the requirements.");
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords does not match. Please try again.");
      hasError = true;
    }

    if (hasError) return;

    const userId = currentUser ? currentUser.id : "EMP-001";
    completeFirstLogin(userId, newUsername.trim(), newPassword);

    // Redirect to Dashboard (Test E-13)
    if (currentUser?.role === "manager") {
      router.push("/manager/dashboard");
    } else {
      router.push("/employee/dashboard");
    }
  };

  const handleCancel = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#07132B] flex flex-col lg:flex-row overflow-x-hidden">
      {/* LEFT COLUMN: Update Account Form */}
      <div className="w-full lg:w-[48%] xl:w-[44%] flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16 z-10">
        {/* Header */}
        <div className="mb-6">
          <Link href="/login" className="inline-block hover:opacity-95 transition-opacity">
            <BlueBeaconLogo light={true} size="default" />
          </Link>
        </div>

        {/* Center Box */}
        <div className="w-full max-w-md mx-auto my-auto py-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Update Your Account
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Welcome to BlueBeacon! Because this is your first login, please replace your temporary credentials with a personal username and secure password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* New Username */}
            <div>
              <label
                htmlFor="newUsername"
                className="block text-xs font-semibold text-white tracking-wide mb-1.5"
              >
                New Username
              </label>
              <div
                className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-2.5 transition-all ${
                  usernameError
                    ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                    : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                }`}
              >
                <User className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                <input
                  id="newUsername"
                  type="text"
                  value={newUsername}
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                    if (usernameError) setUsernameError("");
                  }}
                  placeholder="Enter a username (min. 4 characters)"
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                />
              </div>
              {usernameError && (
                <p className="mt-1 text-xs font-medium text-rose-400">
                  {usernameError}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-xs font-semibold text-white tracking-wide mb-1.5"
              >
                New Password
              </label>
              <div
                className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-2.5 transition-all ${
                  passwordError
                    ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                    : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                }`}
              >
                <Lock className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="Create a strong password"
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-600 hover:text-slate-900 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-xs font-medium text-rose-400">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Password Policy Live Checklist (SOP Section 7.2) */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-xs">
              <span className="font-semibold text-slate-300 block mb-2">
                Password Requirements:
              </span>
              <ul className="space-y-1.5">
                {Object.entries(passwordEvaluation.rules).map(([key, rule]) => (
                  <li
                    key={key}
                    className={`flex items-center gap-2 transition-colors ${
                      rule.met
                        ? "text-emerald-400 font-medium"
                        : passwordError
                        ? "text-rose-400"
                        : "text-slate-400"
                    }`}
                  >
                    {rule.met ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle
                        className={`w-4 h-4 shrink-0 ${
                          passwordError ? "text-rose-400" : "text-slate-500"
                        }`}
                      />
                    )}
                    <span>{rule.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-white tracking-wide mb-1.5"
              >
                Confirm Password
              </label>
              <div
                className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-2.5 transition-all ${
                  confirmError
                    ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                    : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                }`}
              >
                <Lock className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmError) setConfirmError("");
                  }}
                  placeholder="Re-enter your new password"
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-600 hover:text-slate-900 p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmError && (
                <p className="mt-1 text-xs font-medium text-rose-400">
                  {confirmError}
                </p>
              )}
            </div>

            {/* Actions: Save Changes & Cancel */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-5 rounded-xl bg-[#1B4FD8] hover:bg-[#1644FE] text-white font-bold text-xs tracking-wider shadow-lg shadow-blue-900/40 transition-all text-center"
              >
                SAVE CHANGES
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs tracking-wider transition-colors"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center lg:text-left text-[11px] text-slate-500 pt-4">
          &copy; {new Date().getFullYear()} BlueBeacon Inc. SOP-EMS-001 Section 7.2.
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[56%] p-6 lg:p-8 xl:p-10 items-stretch">
        <div className="relative w-full h-full min-h-[640px] rounded-[36px] xl:rounded-[44px] overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/login-hero.jpg"
            alt="BlueBeacon Corporate Campus"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
