'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, FilterConfig } from "../../components/table/DataTable";
import { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "../../graphql/generated";


type LeaveRequest = {
  id: string;
  type: "casual" | "sick" | "personal" | "maternity" | "paternity" | "lwp" | "comp-off";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  approvedBy: string;
};

const columns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return <span className="tabular-nums">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return <span className="tabular-nums">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Leave Type",
    cell: ({ getValue }) => {
      const type = getValue<LeaveRequest["type"]>();
      return <span className="capitalize">{type.replace("-", " ")}</span>;
    },
  },
  {
    accessorKey: "days",
    header: "Days",
    cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()} days</span>,
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ getValue }) => {
      const reason = getValue<string>();
      return <span className="truncate">{reason}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<LeaveRequest["status"]>();
      const colors: Record<LeaveRequest["status"], string> = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        cancelled: "bg-gray-100 text-gray-800",
      };
      return (
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
];

const GET_ALL_LEAVES = graphql(`
  query GetAllLeaves($request: GetAllLeavesRequestInput!) {
    getAllLeaves(request: $request) {
      data {
        leaves {
          id
          employeeId
          leaveType
          startDate
          endDate
          totalDays
          status
          reason
        }
      }
    }
  }
`);

export default function LeavePage() {
  const { data: queryData, loading } = useQuery(GET_ALL_LEAVES, {
    variables: {
      request: {
        pageCriteria: {
          enablePage: true,
          pageSize: 100,
          skip: 0
        }
      },
    },
  });

  const data = useMemo(() => {
    if (!queryData?.getAllLeaves?.data?.leaves) return [];
    return queryData.getAllLeaves.data.leaves.map((leave: any) => ({
      id: leave.id || "",
      type: (leave.leaveType?.toLowerCase() || "casual") as LeaveRequest["type"],
      startDate: leave.startDate ? new Date(leave.startDate).toISOString().split("T")[0] : "",
      endDate: leave.endDate ? new Date(leave.endDate).toISOString().split("T")[0] : "",
      days: leave.totalDays || 0,
      reason: leave.reason || "",
      status: (leave.status?.toLowerCase() || "pending") as LeaveRequest["status"],
      approvedBy: "Manager", // Mock
    }));
  }, [queryData]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search by reason..." },
    {
      type: "checkboxGroup",
      columnId: "type",
      label: "Leave Type",
      options: [
        { label: "Casual", value: "casual" },
        { label: "Sick", value: "sick" },
        { label: "Personal", value: "personal" },
        { label: "Maternity", value: "maternity" },
        { label: "Paternity", value: "paternity" },
        { label: "LWP", value: "lwp" },
        { label: "Comp-off", value: "comp-off" },
      ],
    },
    {
      type: "checkboxGroup",
      columnId: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    { type: "dateRange", columnId: "startDate", label: "Start Date" },
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
                Leave Management
              </h1>
            </div>
            <button className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
              Request Leave
            </button>
          </div>
        </div>
      </header>

      {/* Leave Balance Summary */}
      <div className="border-b border-teal-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Leave Balance
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Casual", balance: 10, used: 2 },
              { label: "Sick", balance: 10, used: 1 },
              { label: "Personal", balance: 5, used: 0 },
              { label: "Comp-off", balance: 3, used: 1 },
            ].map((leave) => (
              <div
                key={leave.label}
                className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700"
              >
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {leave.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {leave.balance - leave.used}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {leave.used} used of {leave.balance}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading leave data...</p>
          </div>
        ) : (
          <DataTable<LeaveRequest>
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
