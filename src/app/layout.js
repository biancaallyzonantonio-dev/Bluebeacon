import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EMSProvider } from "@/context/EMSContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlueBeacon EMS — Employee Management System",
  description: "Enterprise Human Resources and Department Management System for BlueBeacon Inc.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F8FC] text-slate-900">
        <EMSProvider>
          {children}
        </EMSProvider>
      </body>
    </html>
  );
}
