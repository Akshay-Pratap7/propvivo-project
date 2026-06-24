"use client";
import React from "react";
import Link from "next/link";

export default function ContributionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Value Contributions</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Recent Contributions</h2>
          <div className="space-y-4">
            <div className="p-4 border border-slate-100 dark:border-slate-700 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Automated QA Pipeline</h4>
                <p className="text-sm text-slate-500">Innovation • Approved</p>
              </div>
              <span className="text-xl font-bold text-teal-600">+500 pts</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Leaderboard</h2>
          <div className="space-y-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex justify-between items-center text-sm">
                 <span className="text-slate-700 dark:text-slate-300">{i}. Alice Smith</span>
                 <span className="font-bold text-orange-600">{1500 - i*100} pts</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
