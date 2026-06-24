"use client";
import React from "react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Onboarding Journey</h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Your Progress</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0">✓</div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Pre-joining Documents</h4>
              <p className="text-sm text-slate-500">Completed on June 1, 2024</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-teal-100 text-teal-600 border-2 border-teal-600 rounded-full flex items-center justify-center flex-shrink-0">2</div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">IT Setup & Equipment</h4>
              <p className="text-sm text-slate-500">In Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
