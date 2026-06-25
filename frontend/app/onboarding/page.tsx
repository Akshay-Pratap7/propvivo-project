"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "../../graphql/generated";

const GET_ONBOARDING_TASKS = graphql(`
  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {
    onboardingTasks(request: $request) {
      items {
        id
        userId
        phase
        title
        isCompleted
      }
    }
  }
`);

export default function OnboardingPage() {
  const { data: queryData, loading } = useQuery(GET_ONBOARDING_TASKS, {
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

  const tasks = useMemo(() => {
    if (!queryData?.onboardingTasks?.items) return [];
    return queryData.onboardingTasks.items.map((record: any) => ({
      id: record.id || "",
      title: record.title || "Onboarding Task",
      phase: record.phase || "General",
      isCompleted: !!record.isCompleted,
    }));
  }, [queryData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Onboarding Journey</h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Your Progress</h2>
        {loading ? (
          <p className="text-slate-500 text-sm">Loading onboarding tasks...</p>
        ) : (
          <div className="space-y-6">
            {tasks.map((task, idx) => (
              <div key={task.id} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  task.isCompleted ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-600 border-2 border-teal-600"
                }`}>
                  {task.isCompleted ? "✓" : idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{task.title}</h4>
                  <p className="text-sm text-slate-500">{task.phase} • {task.isCompleted ? "Completed" : "In Progress"}</p>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-slate-500 text-sm">No onboarding tasks assigned.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
