"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEMS } from "@/context/EMSContext";
import BlueBeaconLogo from "@/components/common/BlueBeaconLogo";
import { IdCard, Mail, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

export default function ActivateAccountPage() {
  const router = useRouter();
  const { activateAccount } = useEMS();

  const [employeeId, setEmployeeId] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const [employeeIdError, setEmployeeIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isActivatedSuccess, setIsActivatedSuccess] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeIdError("");
    setEmailError("");

    if (!employeeId.trim()) {
      setEmployeeIdError("Please enter your Employee ID.");
      return;
    }
    if (!companyEmail.trim()) {
      setEmailError("Please enter your company email address.");
      return;
    }

    const result = activateAccount(employeeId, companyEmail);

    if (!result.success) {
      if (result.error.includes("Employee ID")) {
        setEmployeeIdError(result.error);
      } else {
        setEmailError(result.error);
      }
      return;
    }

    setRecipientEmail(result.email);
    setIsActivatedSuccess(true);
  };

  const handleCheckEmail = () => {
    // Navigate back to login
    router.push(`/login?activated=true&email=${encodeURIComponent(recipientEmail)}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#07132B] flex flex-col lg:flex-row overflow-x-hidden">
      {/* LEFT COLUMN: Activation Form or Success Card */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16 z-10">
        {/* Top Header */}
        <div className="mb-8">
          <Link href="/login" className="inline-block hover:opacity-95 transition-opacity">
            <BlueBeaconLogo light={true} size="default" />
          </Link>
        </div>

        {/* Center Card */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          {!isActivatedSuccess ? (
            <>
              <div className="mb-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors mb-4"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                Activate Your Account
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Enter your HR-issued Employee ID and verified corporate email to initialize your EMS profile.
              </p>

              {/* Quick helper for testing */}
              <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 block mb-1">
                  Test Activation Candidate:
                </span>
                <div className="flex items-center justify-between">
                  <span>ID: <code className="text-blue-300">EMP-009</code> · Email: <code className="text-blue-300">emorales@bluebeacon.com</code></span>
                  <button
                    type="button"
                    onClick={() => {
                      setEmployeeId("EMP-009");
                      setCompanyEmail("emorales@bluebeacon.com");
                    }}
                    className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 underline"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Employee ID */}
                <div>
                  <label
                    htmlFor="empIdInput"
                    className="block text-xs font-semibold text-white tracking-wide mb-1.5"
                  >
                    Employee ID
                  </label>
                  <div
                    className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-3 transition-all ${
                      employeeIdError
                        ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                        : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                    }`}
                  >
                    <IdCard className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                    <input
                      id="empIdInput"
                      type="text"
                      value={employeeId}
                      onChange={(e) => {
                        setEmployeeId(e.target.value);
                        if (employeeIdError) setEmployeeIdError("");
                      }}
                      placeholder="e.g. EMP-001"
                      className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                    />
                  </div>
                  {employeeIdError && (
                    <p className="mt-1.5 text-xs font-medium text-rose-400">
                      {employeeIdError}
                    </p>
                  )}
                </div>

                {/* Company Email */}
                <div>
                  <label
                    htmlFor="emailInput"
                    className="block text-xs font-semibold text-white tracking-wide mb-1.5"
                  >
                    Company Email
                  </label>
                  <div
                    className={`relative flex items-center bg-[#E5E9F0] rounded-xl px-3.5 py-3 transition-all ${
                      emailError
                        ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50/95"
                        : "focus-within:ring-2 focus-within:ring-[#1644FE]"
                    }`}
                  >
                    <Mail className="w-5 h-5 text-slate-700 shrink-0 select-none" />
                    <input
                      id="emailInput"
                      type="email"
                      value={companyEmail}
                      onChange={(e) => {
                        setCompanyEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="username@bluebeacon.com"
                      className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 font-medium text-sm outline-none px-3"
                    />
                  </div>
                  {emailError && (
                    <p className="mt-1.5 text-xs font-medium text-rose-400">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1B4FD8] hover:bg-[#1644FE] text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
                  >
                    <span>ACTIVATE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Account Activated Confirmation Card (Figure 2 / Test E-08) */
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-8 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-5">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Activated</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Your account has been verified against BlueBeacon HR records. System-generated temporary credentials have been sent to:
              </p>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-blue-300 font-mono text-sm mb-6">
                {recipientEmail}
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Please log in using your default credentials. You will be prompted to set your personal username and password upon first login.
              </p>
              <button
                type="button"
                onClick={handleCheckEmail}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-sm tracking-wider shadow-lg transition-all"
              >
                CHECK YOUR EMAIL
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center lg:text-left text-[11px] text-slate-500 pt-4">
          &copy; {new Date().getFullYear()} BlueBeacon Inc. SOP-EMS-001 Section 7.1.
        </div>
      </div>

      {/* RIGHT COLUMN: Modern Corporate Glass Facade Image */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] p-6 lg:p-8 xl:p-10 items-stretch">
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
