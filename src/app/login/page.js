"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEMS } from "@/context/EMSContext";
import BlueBeaconLogo from "@/components/common/BlueBeaconLogo";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck, HelpCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchDemoUser } = useEMS();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (!usernameOrEmail.trim()) {
      setUsernameError("Please enter your employee ID, username, or company email.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    const result = login(usernameOrEmail, password);
    setIsSubmitting(false);

    if (!result.success) {
      if (result.error.includes("Username") || result.error.includes("Email") || result.error.includes("activated")) {
        setUsernameError(result.error);
      } else {
        setPasswordError(result.error);
      }
      return;
    }

    // Check if first-login setup is required (Procedure 7.2)
    if (result.isFirstLogin) {
      router.push("/update-account");
      return;
    }

    // Role-based routing (Procedure 7.3 & D-01)
    if (result.user.role === "manager") {
      router.push("/manager/dashboard");
    } else {
      router.push("/employee/dashboard");
    }
  };

  // Quick Switch Helper for instant evaluation
  const handleQuickDemo = (role) => {
    setUsernameError("");
    setPasswordError("");
    if (role === "employee") {
      setUsernameOrEmail("bianca.antonio");
      setPassword("Password@123");
    } else {
      setUsernameOrEmail("andrei.vance");
      setPassword("Password@123");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07132B] flex flex-col lg:flex-row overflow-x-hidden">
      {/* LEFT COLUMN: Authentication Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16 z-10">
        {/* Top Header: Brand Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
            <BlueBeaconLogo light={true} size="default" />
          </Link>
        </div>

        {/* Center: Main Login Box */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Login to Your Account
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Access your dashboard and manage your employee management system with ease.
          </p>

          {/* Quick Demo Pre-Fill Badges */}
          <div className="mb-6 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider ml-1">
              Demo Autofill:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo("employee")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-medium transition-colors"
                title="Bia Antonio (EMP-001)"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Employee
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("manager")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium transition-colors"
                title="Andrei Vance (MGR-001)"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Manager
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Field 1: Username or Email */}
            <div>
              <label
                htmlFor="usernameInput"
                className="block text-xs font-semibold text-white tracking-wide mb-1.5"
              >
                Username or Email
              </label>
              <div
                className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-3 transition-all ${
                  usernameError
                    ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                    : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                }`}
              >
                <User className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                <input
                  id="usernameInput"
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => {
                    setUsernameOrEmail(e.target.value);
                    if (usernameError) setUsernameError("");
                  }}
                  placeholder="Enter your employee ID"
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                  autoComplete="username"
                />
              </div>
              {usernameError && (
                <p className="mt-1.5 text-xs font-medium text-rose-400 flex items-center gap-1 animate-fadeIn">
                  {usernameError}
                </p>
              )}
            </div>

            {/* Field 2: Password */}
            <div>
              <label
                htmlFor="passwordInput"
                className="block text-xs font-semibold text-white tracking-wide mb-1.5"
              >
                Password
              </label>
              <div
                className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-3 transition-all ${
                  passwordError
                    ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                    : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                }`}
              >
                <Lock className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                <input
                  id="passwordInput"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-600 hover:text-slate-900 focus:outline-none p-1 transition-colors select-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-xs font-medium text-rose-400 flex items-center gap-1 animate-fadeIn">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1 select-none">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-[#1644FE] focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="font-medium text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Action: Pill Button */}
            <div className="pt-3 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-44 py-3 px-6 rounded-full bg-[#1B4FD8] hover:bg-[#1644FE] active:scale-95 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 select-none border border-blue-400/30"
              >
                <span>LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Bottom Footers */}
          <div className="mt-8 text-center text-xs text-slate-400 space-y-2">
            <p>
              Can&apos;t open account?{" "}
              <button
                onClick={() => setShowHelpModal(true)}
                className="text-[#3B82F6] hover:text-blue-300 font-medium transition-colors"
              >
                Contact Administrator
              </button>
            </p>
            <p>
              New employee?{" "}
              <Link
                href="/activate"
                className="text-white hover:text-blue-300 font-semibold underline underline-offset-4 transition-colors"
              >
                Activate your account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer copyright */}
        <div className="text-center lg:text-left text-[11px] text-slate-500 pt-4">
          &copy; {new Date().getFullYear()} BlueBeacon Inc. SOP-EMS-001 System Portal.
        </div>
      </div>

      {/* RIGHT COLUMN: Modern Corporate Glass Facade Image */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] p-6 lg:p-8 xl:p-10 items-stretch">
        <div className="relative w-full h-full min-h-[640px] rounded-[36px] xl:rounded-[44px] overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/login-hero.jpg"
            alt="BlueBeacon Corporate Headquarters Campus"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient overlay to soften edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Forgot Password / Contact Administrator Dialog */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2.5 rounded-xl bg-blue-50 text-[#1644FE]">
                <HelpCircle className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-bold text-base text-[#0E2148]">Account Assistance</h3>
                <p className="text-xs text-slate-500">System Administrator Support</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              In accordance with BlueBeacon SOP-EMS-001 (Section 9), employee password resets and account unlock requests are processed securely by the System Administrator.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1 mb-5">
              <p><strong>IT Support Hotline:</strong> +63 (2) 8877-BEACON</p>
              <p><strong>Administrator Email:</strong> it-admin@bluebeacon.com</p>
              <p><strong>Operating Hours:</strong> Mon - Fri, 8:00 AM - 6:00 PM</p>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0E2148] hover:bg-[#1644FE] text-white text-xs font-semibold tracking-wider transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
