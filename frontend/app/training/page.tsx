"use client";
import React from "react";
import Link from "next/link";

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Training & Learning</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-teal-100 dark:border-slate-700">
            <div className="h-32 bg-teal-100 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-teal-600 dark:text-teal-400 font-bold text-xl">Module {i}</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Advanced React Patterns</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Master hooks, context, and performance optimization.</p>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
}
