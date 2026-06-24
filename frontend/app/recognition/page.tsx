"use client";
import React from "react";
import Link from "next/link";

export default function RecognitionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Recognition & Appreciation</h1>
      </header>
      <div className="max-w-2xl mx-auto space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">JD</div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">John Doe recognized Jane Smith</h4>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic">"Amazing work on the Q2 reports! Your attention to detail is unmatched."</p>
            <div className="mt-4 flex gap-4 text-sm text-slate-500">
              <button className="hover:text-orange-600">❤ Like (5)</button>
              <button className="hover:text-teal-600">💬 Comment (2)</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
