"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";

const GET_RECOGNITIONS = graphql(`
  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {
    recognitions(request: $request) {
      items {
        id
        giverId
        receiverId
        message
        category
        createdOn
      }
    }
  }
`);

export default function RecognitionPage() {
  const { data: queryData, loading } = useQuery(GET_RECOGNITIONS, {
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

  const recognitions = useMemo(() => {
    if (!queryData?.recognitions?.items) return [];
    return queryData.recognitions.items.map((record: any) => {
      // Helper to display initials
      const giverName = record.giverId || "Giver";
      const initials = giverName.slice(0, 2).toUpperCase();
      return {
        id: record.id || "",
        giverName,
        receiverName: record.receiverId || "Receiver",
        message: record.message || "",
        category: record.category || "Appreciation",
        dateText: record.createdOn ? new Date(record.createdOn).toLocaleString() : "Just now",
        initials,
      };
    });
  }, [queryData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <header className="mb-8">
        <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 dark:text-teal-400">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Recognition & Appreciation</h1>
      </header>
      <div className="max-w-2xl mx-auto space-y-6">
        {loading ? (
          <p className="text-slate-500 text-center">Loading recognitions...</p>
        ) : (
          <>
            {recognitions.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {item.giverName} recognized {item.receiverName}
                    </h4>
                    <p className="text-xs text-slate-500">{item.dateText} • {item.category}</p>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic">"{item.message}"</p>
                <div className="mt-4 flex gap-4 text-sm text-slate-500">
                  <button className="hover:text-orange-600">❤ Like</button>
                  <button className="hover:text-teal-600">💬 Comment</button>
                </div>
              </div>
            ))}
            {recognitions.length === 0 && (
              <p className="text-slate-500 text-center">No recognition posts yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
