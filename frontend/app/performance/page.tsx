"use client";
import React from "react";
import Link from "next/link";

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Performance & Goals</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-teal-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Active Goals</h2>
          <div className="space-y-4">
            <div className="p-4 bg-teal-50 dark:bg-slate-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-900 dark:text-white">Increase Sales by 20%</span>
                <span className="text-sm text-teal-600 dark:text-teal-400">75%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-orange-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Performance Reviews</h2>
          <p className="text-slate-600 dark:text-slate-400">Next review scheduled for Q3 2024.</p>
        </div>
      </div>
    </div>
  );
}
