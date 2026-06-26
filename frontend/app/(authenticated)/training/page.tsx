"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";

const GET_TRAINING_MODULES = graphql(`
  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {
    trainingModules(request: $request) {
      items {
        id
        title
        description
        category
        contentUrl
        isMandatory
      }
    }
  }
`);

export default function TrainingPage() {
  const { data: queryData, loading } = useQuery(GET_TRAINING_MODULES, {
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

  const modules = useMemo(() => {
    if (!queryData?.trainingModules?.items) return [];
    return queryData.trainingModules.items.map((record: any) => ({
      id: record.id || "",
      title: record.title || "Learning Module",
      description: record.description || "",
      category: record.category || "General",
      isMandatory: !!record.isMandatory,
    }));
  }, [queryData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Training & Learning</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {loading ? (
          <p className="text-slate-500 col-span-3 text-center">Loading training modules...</p>
        ) : (
          <>
            {modules.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-teal-100 dark:border-slate-700">
                <div className="h-32 bg-teal-100 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold text-xl">{item.category}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
                <div className="flex gap-2">
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">Start Learning</button>
                  {item.isMandatory && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded flex items-center shrink-0">Required</span>
                  )}
                </div>
              </div>
            ))}
            {modules.length === 0 && (
              <p className="text-slate-500 col-span-3 text-center">No learning modules assigned.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
