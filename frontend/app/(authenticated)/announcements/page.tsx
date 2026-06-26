'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";

type Announcement = {
  id: string;
  title: string;
  category: "hr-update" | "event" | "policy" | "celebration" | "compliance" | "general";
  priority: "low" | "medium" | "high";
  content: string;
  postedDate: string;
  expiryDate: string;
  views: number;
  likes: number;
  acknowledged: boolean;
};

const categoryColors: Record<Announcement["category"], string> = {
  "hr-update": "bg-blue-100 text-blue-800",
  event: "bg-purple-100 text-purple-800",
  policy: "bg-orange-100 text-orange-800",
  celebration: "bg-pink-100 text-pink-800",
  compliance: "bg-red-100 text-red-800",
  general: "bg-gray-100 text-gray-800",
};

const priorityColors: Record<Announcement["priority"], string> = {
  low: "border-l-4 border-green-500",
  medium: "border-l-4 border-yellow-500",
  high: "border-l-4 border-red-500",
};

const GET_ANNOUNCEMENTS = graphql(`
  query GetAnnouncements($request: GetAllAnnouncementsRequestInput!) {
    announcements(request: $request) {
      items {
        id
        title
        content
        category
        priority
        postedDate
        expiryDate
        views
        likes
      }
    }
  }
`);

export default function AnnouncementsPage() {
  const { data: queryData, loading } = useQuery(GET_ANNOUNCEMENTS, {
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

  const data = useMemo(() => {
    if (!queryData?.announcements?.items) return [];
    return queryData.announcements.items.map((record: any) => ({
      id: record.id || "",
      title: record.title || "Announcement",
      content: record.content || "",
      category: (record.category?.toLowerCase() || "general") as Announcement["category"],
      priority: (record.priority?.toLowerCase() || "low") as Announcement["priority"],
      postedDate: record.postedDate ? new Date(record.postedDate).toISOString().split("T")[0] : "",
      expiryDate: record.expiryDate ? new Date(record.expiryDate).toISOString().split("T")[0] : "",
      views: record.views || 0,
      likes: record.likes || 0,
      acknowledged: false, // Default acknowledgment
    }));
  }, [queryData]);

  const [filter, setFilter] = useState<"all" | "unacknowledged">("all");

  const filteredData =
    filter === "unacknowledged"
      ? data.filter((a) => !a.acknowledged)
      : data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-teal-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400">
                ← Back to Dashboard
              </Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                Announcements
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading announcements...</p>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                }`}
              >
                All Announcements ({data.length})
              </button>
              <button
                onClick={() => setFilter("unacknowledged")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "unacknowledged"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                }`}
              >
                Pending Acknowledgment ({data.filter((a) => !a.acknowledged).length})
              </button>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {filteredData.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-slate-700 ${
                    priorityColors[announcement.priority] || "border-l-4 border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {announcement.title}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            categoryColors[announcement.category] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {announcement.category.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-2 text-slate-600 dark:text-slate-400">
                        {announcement.content}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>
                          Posted: {announcement.postedDate ? new Date(announcement.postedDate).toLocaleDateString() : "—"}
                        </span>
                        <span>
                          Expires: {announcement.expiryDate ? new Date(announcement.expiryDate).toLocaleDateString() : "—"}
                        </span>
                        <span>👁 {announcement.views} views</span>
                        <span>❤ {announcement.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!announcement.acknowledged ? (
                        <button className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
                          Acknowledge
                        </button>
                      ) : (
                        <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                          ✓ Acknowledged
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="rounded-lg bg-white p-12 text-center dark:bg-slate-700">
                <p className="text-slate-600 dark:text-slate-400">
                  No announcements to display.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

