"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";

const GET_JOB_POSTINGS = graphql(`
  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {
    jobPostings(request: $request) {
      items {
        id
        title
        description
        department
        location
        status
      }
    }
  }
`);

export default function RecruitmentPage() {
  const { data: queryData, loading } = useQuery(GET_JOB_POSTINGS, {
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

  const jobs = useMemo(() => {
    if (!queryData?.jobPostings?.items) return [];
    return queryData.jobPostings.items.map((record: any) => ({
      id: record.id || "",
      title: record.title || "Job Posting",
      description: record.description || "",
      department: record.department || "General",
      location: record.location || "Remote",
      status: record.status || "Active",
    }));
  }, [queryData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Recruitment Workspace</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Open Job Postings</h2>
          {loading ? (
            <p className="text-slate-500 text-sm">Loading job postings...</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-bold text-slate-900 dark:text-white">{job.title}</h4>
                  <p className="text-sm text-slate-500">{job.department} • {job.location}</p>
                  <p className="text-xs text-slate-400 mt-1">{job.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded">{job.status}</span>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <p className="text-slate-500 text-sm">No open job postings found.</p>
              )}
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Candidate Pipeline</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your hiring workflow here.</p>
        </div>
      </div>
    </div>
  );
}
