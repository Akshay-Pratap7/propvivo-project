"use client";
import React from "react";
import Link from "next/link";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Recruitment Workspace</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Open Job Postings</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white">Senior Software Engineer</h4>
              <p className="text-sm text-slate-500">Engineering • Remote</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded">12 Candidates</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">3 Interviews</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Candidate Pipeline</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your hiring workflow here.</p>
        </div>
      </div>
    </div>
  );
}
