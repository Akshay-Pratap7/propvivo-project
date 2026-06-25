"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "../../graphql/generated";

const GET_CONTRIBUTIONS = graphql(`
  query GetContributions($request: GetAllContributionsRequestInput!) {
    contributions(request: $request) {
      items {
        id
        userId
        title
        description
        category
        points
        status
      }
    }
  }
`);

export default function ContributionsPage() {
  const { data: queryData, loading } = useQuery(GET_CONTRIBUTIONS, {
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

  const contributions = useMemo(() => {
    if (!queryData?.contributions?.items) return [];
    return queryData.contributions.items.map((record: any) => ({
      id: record.id || "",
      title: record.title || "Contribution",
      category: record.category || "General",
      points: record.points || 0,
      status: record.status || "Pending",
      userId: record.userId || "Employee",
    }));
  }, [queryData]);

  // Compute a simple local leaderboard based on total points per user ID
  const leaderboard = useMemo(() => {
    const pointsMap: Record<string, number> = {};
    contributions.forEach((c) => {
      const user = c.userId || "User";
      pointsMap[user] = (pointsMap[user] || 0) + c.points;
    });

    return Object.entries(pointsMap)
      .map(([userId, pts]) => ({ userId, pts }))
      .sort((a, b) => b.pts - a.pts)
      .slice(0, 5);
  }, [contributions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Value Contributions</h1>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Recent Contributions</h2>
          {loading ? (
            <p className="text-slate-500 text-sm">Loading contributions...</p>
          ) : (
            <div className="space-y-4">
              {contributions.map((item) => (
                <div key={item.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.category} • {item.status}</p>
                  </div>
                  <span className="text-xl font-bold text-teal-600">+{item.points} pts</span>
                </div>
              ))}
              {contributions.length === 0 && (
                <p className="text-slate-500 text-sm">No contributions submitted yet.</p>
              )}
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Leaderboard</h2>
          <div className="space-y-3">
             {leaderboard.map((item, idx) => (
               <div key={item.userId} className="flex justify-between items-center text-sm">
                 <span className="text-slate-700 dark:text-slate-300">{idx + 1}. {item.userId}</span>
                 <span className="font-bold text-orange-600">{item.pts} pts</span>
               </div>
             ))}
             {leaderboard.length === 0 && (
               <p className="text-slate-500 text-sm">No points recorded.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
