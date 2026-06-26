"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";

const GET_ANALYTICS_REPORTS = graphql(`
  query GetAnalyticsReports($request: GetAllReportsRequestInput!) {
    analyticsReports(request: $request) {
      items {
        id
        title
        category
        dataJson
        generatedDate
      }
    }
  }
`);

export default function AnalyticsPage() {
  const { data: queryData, loading } = useQuery(GET_ANALYTICS_REPORTS, {
    variables: {
      request: {
        pageCriteria: {
          enablePage: true,
          pageSize: 100,
          skip: 0
        }
      }
    }
  });

  const reports = useMemo(() => {
    if (!queryData?.analyticsReports?.items) return [];
    return queryData.analyticsReports.items.map((record: any) => ({
      id: record.id || "",
      title: record.title || "Report",
      category: record.category || "General",
      date: record.generatedDate ? new Date(record.generatedDate).toLocaleDateString() : "—",
      data: record.dataJson ? JSON.parse(record.dataJson) : null,
    }));
  }, [queryData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">HR Analytics & Reports</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-slate-500 col-span-3 text-center">Loading analytics reports...</p>
        ) : (
          <>
            {reports.map((report) => (
              <div key={report.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex flex-col justify-between h-64 border border-teal-100 dark:border-slate-700">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 capitalize">
                    {report.category}
                  </span>
                  <h3 className="text-lg font-bold mt-2 text-slate-900 dark:text-white">{report.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Generated: {report.date}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
            {reports.length === 0 && (
              <div className="col-span-3 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center">
                <p className="text-slate-500">No analytics reports generated yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
