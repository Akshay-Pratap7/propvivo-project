"use client";
import React from "react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">HR Analytics</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md h-64 flex items-center justify-center">
          <p className="text-slate-400 italic">Attendance Trends Chart</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md h-64 flex items-center justify-center">
          <p className="text-slate-400 italic">Department Headcount Chart</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md h-64 flex items-center justify-center">
          <p className="text-slate-400 italic">Payroll Distribution Chart</p>
        </div>
      </div>
    </div>
  );
}
