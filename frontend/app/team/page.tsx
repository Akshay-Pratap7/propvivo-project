'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, FilterConfig } from "../../components/table/DataTable";
import { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "../../graphql/generated";

type TeamMember = {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
};

const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
      const name = getValue<string>() || "";
      const initials = name
        ? name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "??";
      return (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
            <span className="text-xs font-bold text-teal-700">
              {initials}
            </span>
          </div>
          <span className="font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ getValue }) => {
      const dept = getValue<string>();
      return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-700">
          {dept || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => {
      const email = getValue<string>();
      return <span className="text-sm text-slate-600 dark:text-slate-400">{email || "—"}</span>;
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ getValue }) => {
      const dateVal = getValue<string>();
      if (!dateVal) return <span className="text-slate-400">—</span>;
      const date = new Date(dateVal);
      return <span className="tabular-nums">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<TeamMember["status"]>();
      const colors: Record<TeamMember["status"], string> = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        "on-leave": "bg-yellow-100 text-yellow-800",
      };
      const normalizedStatus = (status?.toLowerCase() || "active") as TeamMember["status"];
      return (
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[normalizedStatus] || "bg-gray-100 text-gray-800"}`}>
          {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1).replace("-", " ")}
        </span>
      );
    },
  },
];

const GET_ALL_TEAM_MEMBERS = graphql(`
  query GetAllTeamMembers($request: GetAllTeamMembersRequestInput!) {
    allTeamMembers(request: $request) {
      data {
        teamMembers {
          memberId
          firstName
          lastName
          email
          designation
          department
          dateOfJoining
          status
        }
      }
    }
  }
`);

export default function TeamPage() {
  const { data: queryData, loading } = useQuery(GET_ALL_TEAM_MEMBERS, {
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
    if (!queryData?.allTeamMembers?.data?.teamMembers) return [];
    return queryData.allTeamMembers.data.teamMembers.map((record: any) => ({
      id: record.memberId || "",
      name: `${record.firstName || ""} ${record.lastName || ""}`.trim() || "Unknown Employee",
      designation: record.designation || "Employee",
      department: record.department || "General",
      email: record.email || "",
      status: (record.status?.toLowerCase() || "active") as TeamMember["status"],
      joinDate: record.dateOfJoining ? new Date(record.dateOfJoining).toISOString().split("T")[0] : "",
    }));
  }, [queryData]);

  // Compute team overview statistics
  const overview = useMemo(() => {
    let active = 0;
    let onLeave = 0;
    let inactive = 0;

    data.forEach((member) => {
      const normalizedStatus = member.status?.toLowerCase();
      if (normalizedStatus === "active") active++;
      else if (normalizedStatus === "on-leave" || normalizedStatus === "leave") onLeave++;
      else inactive++;
    });

    return {
      total: data.length,
      active,
      onLeave,
      inactive,
    };
  }, [data]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search team members..." },
    {
      type: "checkboxGroup",
      columnId: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Product", value: "Product" },
        { label: "Design", value: "Design" },
        { label: "Analytics", value: "Analytics" },
        { label: "HR", value: "HR" },
      ],
    },
    {
      type: "checkboxGroup",
      columnId: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "On Leave", value: "on-leave" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-teal-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400">
                ← Back to Dashboard
              </Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                Team Management
              </h1>
            </div>
            <button className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Add Team Member
            </button>
          </div>
        </div>
      </header>

      {/* Team Summary */}
      <div className="border-b border-teal-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Team Overview
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Total Members", count: overview.total, color: "bg-blue-100 text-blue-800" },
              { label: "Active", count: overview.active, color: "bg-green-100 text-green-800" },
              { label: "On Leave", count: overview.onLeave, color: "bg-yellow-100 text-yellow-800" },
              { label: "Inactive", count: overview.inactive, color: "bg-gray-100 text-gray-800" },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-lg p-4 ${item.color}`}
              >
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-2 text-2xl font-bold">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading team members...</p>
          </div>
        ) : (
          <DataTable<TeamMember>
            data={data}
            columns={columns}
            pageSizeOptions={[10, 20, 50]}
            initialPageSize={10}
            filters={filters}
            className="rounded-md"
          />
        )}
      </main>
    </div>
  );
}

