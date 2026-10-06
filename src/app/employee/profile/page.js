"use client";

import { useState } from "react";
import Image from "next/image";
import { useEMS } from "@/context/EMSContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldAlert,
  Camera,
  CheckCircle2,
  Lock,
  RotateCcw,
  Save,
  AlertCircle
} from "lucide-react";

export default function EmployeeProfilePage() {
  const { currentUser, updateProfile } = useEMS();

  // Editable Form State
  const [phone, setPhone] = useState(currentUser?.phone || "+63 917 123 4567");
  const [address, setAddress] = useState(currentUser?.address || "Unit 402, Solaris Residences, Makati City");
  const [dateOfBirth, setDateOfBirth] = useState(currentUser?.dateOfBirth || "2001-08-24");
  const [gender, setGender] = useState(currentUser?.gender || "Female");
  const [civilStatus, setCivilStatus] = useState(currentUser?.civilStatus || "Single");
  const [nationality, setNationality] = useState(currentUser?.nationality || "Filipino");
  const [emergencyName, setEmergencyName] = useState(currentUser?.emergencyContact?.name || "Maria Antonio");
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser?.emergencyContact?.phone || "+63 918 987 6543");

  // Validation States (Test E-47)
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [readOnlyNotice, setReadOnlyNotice] = useState("");

  const handleReadOnlyClick = (fieldName) => {
    setReadOnlyNotice(`Can't edit ${fieldName}. This is an HR-maintained record.`);
    setTimeout(() => setReadOnlyNotice(""), 3500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPhoneError("");
    setAddressError("");
    setSaveSuccess(false);

    let hasError = false;

    // Validate phone (digits with optional leading +)
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
    if (!phone.trim()) {
      setPhoneError("Please enter your phone number.");
      hasError = true;
    } else if (!phoneRegex.test(phone.trim())) {
      setPhoneError("Please enter a valid phone number.");
      hasError = true;
    }

    if (!address.trim()) {
      setAddressError("Please enter your residential address.");
      hasError = true;
    }

    if (hasError) return;

    // Save changes to store
    updateProfile(currentUser.id, {
      phone: phone.trim(),
      address: address.trim(),
      dateOfBirth,
      gender,
      civilStatus,
      nationality,
      emergencyContact: {
        name: emergencyName.trim(),
        relationship: currentUser?.emergencyContact?.relationship || "Contact",
        phone: emergencyPhone.trim()
      }
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Cancel action reverts values to current store (Test E-48 / D-09)
  const handleCancel = () => {
    setPhone(currentUser?.phone || "+63 917 123 4567");
    setAddress(currentUser?.address || "");
    setDateOfBirth(currentUser?.dateOfBirth || "");
    setGender(currentUser?.gender || "Female");
    setCivilStatus(currentUser?.civilStatus || "Single");
    setNationality(currentUser?.nationality || "Filipino");
    setEmergencyName(currentUser?.emergencyContact?.name || "");
    setEmergencyPhone(currentUser?.emergencyContact?.phone || "");
    setPhoneError("");
    setAddressError("");
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Page Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0E2148] tracking-tight">
          Personal Information
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review company employment details and update personal contact information.
        </p>
      </div>

      {/* Floating Read-Only Toast Notice (Test E-44) */}
      {readOnlyNotice && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{readOnlyNotice}</span>
        </div>
      )}

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully.</span>
        </div>
      )}

      {/* Profile Overview Card (Procedure 7.9 / Figure 34 / Test E-43) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar with Camera Icon */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-3xl font-bold text-[#1644FE]">
            {currentUser?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="object-cover w-full h-full"
              />
            ) : (
              currentUser?.shortName?.[0] || "U"
            )}
          </div>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#1644FE] text-white shadow-md hover:bg-[#1338d4] transition-colors"
            title="Upload profile photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Overview Information */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl font-bold text-[#0E2148]">{currentUser?.name}</h3>
              <p className="text-xs text-slate-500">{currentUser?.position} · {currentUser?.department}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1644FE] font-bold text-xs border border-blue-100 self-center sm:self-auto">
              {currentUser?.id}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-mono">{currentUser?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{currentUser?.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form: Employment Records (Read-Only) + Personal Details (Editable) */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Employment Details (HR Maintained - Read Only, Test E-44) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" />
              <h4 className="font-bold text-sm text-[#0E2148]">Employment Details</h4>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Read-Only (HR Managed)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => handleReadOnlyClick("Full Name")}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
            >
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                Full Name
              </label>
              <p className="text-xs font-semibold text-slate-800">{currentUser?.name}</p>
            </div>

            <div
              onClick={() => handleReadOnlyClick("Employee ID")}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
            >
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                Employee ID
              </label>
              <p className="text-xs font-mono font-bold text-blue-600">{currentUser?.id}</p>
            </div>

            <div
              onClick={() => handleReadOnlyClick("Department")}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
            >
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                Department
              </label>
              <p className="text-xs font-semibold text-slate-800">{currentUser?.department}</p>
            </div>

            <div
              onClick={() => handleReadOnlyClick("Position")}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
            >
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                Position
              </label>
              <p className="text-xs font-semibold text-slate-800">{currentUser?.position}</p>
            </div>

            <div
              onClick={() => handleReadOnlyClick("Date Hired")}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
            >
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                Date Hired
              </label>
              <p className="text-xs font-semibold text-slate-800">{currentUser?.dateHired}</p>
            </div>

            <div
              onClick={() => handleReadOnlyClick("Employment Type")}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors"
            >
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                Employment Type
              </label>
              <p className="text-xs font-semibold text-slate-800">{currentUser?.employmentType}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Contact Details (Editable, Tests E-45 to E-48) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 card-shadow">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#1644FE]" />
              <h4 className="font-bold text-sm text-[#0E2148]">Personal & Contact Details</h4>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Editable Fields</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date of Birth with Year jump (Test E-45) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none focus:border-[#1644FE]"
              />
            </div>

            {/* Gender (Test E-46) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#1644FE]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            {/* Civil Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Civil Status
              </label>
              <select
                value={civilStatus}
                onChange={(e) => setCivilStatus(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#1644FE]"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nationality
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#1644FE]"
              />
            </div>

            {/* Phone Number (Test E-47) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError("");
                }}
                className={`w-full bg-[#F8FAFC] border rounded-xl px-3 py-2 text-xs text-slate-900 outline-none ${
                  phoneError
                    ? "border-rose-500 ring-2 ring-rose-100"
                    : "border-slate-300 focus:border-[#1644FE]"
                }`}
              />
              {phoneError && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{phoneError}</p>
              )}
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Residential Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (addressError) setAddressError("");
                }}
                className={`w-full bg-[#F8FAFC] border rounded-xl px-3 py-2 text-xs text-slate-900 outline-none ${
                  addressError
                    ? "border-rose-500 ring-2 ring-rose-100"
                    : "border-slate-300 focus:border-[#1644FE]"
                }`}
              />
              {addressError && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{addressError}</p>
              )}
            </div>

            {/* Emergency Contact Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Emergency Contact Name
              </label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#1644FE]"
              />
            </div>

            {/* Emergency Contact Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Emergency Contact Phone
              </label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#1644FE]"
              />
            </div>
          </div>

          {/* Action Buttons: Save & Cancel (Test E-48 / Resolves D-08, D-09) */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs tracking-wider transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CANCEL</span>
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[#1644FE] hover:bg-[#1338d4] text-white font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE CHANGES</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
