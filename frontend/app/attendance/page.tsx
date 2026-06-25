'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, FilterConfig } from "../../components/table/DataTable";
import { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "../../graphql/generated";

type AttendanceRecord = {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: "present" | "absent" | "late" | "half-day" | "on-leave";
  workingHours: number;
  location: string;
};

const columns: any[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }: any) => {
      const date = new Date(getValue());
      return <span className="tabular-nums">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "clockIn",
    header: "Clock In",
    cell: ({ getValue }: any) => {
      const time = getValue();
      return <span className="tabular-nums">{time || "—"}</span>;
    },
  },
  {
    accessorKey: "clockOut",
    header: "Clock Out",
    cell: ({ getValue }: any) => {
      const time = getValue();
      return <span className="tabular-nums">{time || "—"}</span>;
    },
  },
  {
    accessorKey: "workingHours",
    header: "Working Hours",
    cell: ({ getValue }: any) => {
      const hours = getValue();
      return <span className="tabular-nums">{hours.toFixed(2)}h</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }: any) => {
      const status = getValue();
      const colors: any = {
        present: "bg-green-100 text-green-800",
        absent: "bg-red-100 text-red-800",
        late: "bg-yellow-100 text-yellow-800",
        "half-day": "bg-blue-100 text-blue-800",
        "on-leave": "bg-purple-100 text-purple-800",
      };
      return (
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];

const GET_ALL_ATTENDANCE = graphql(`
  query GetAllAttendance($request: GetAllAttendanceRequestInput!) {
    getAllAttendance(request: $request) {
      data {
        attendanceRecords {
          id
          employeeId
          date
          clockInTime
          clockOutTime
          status
          totalHours
          overtimeHours
        }
      }
    }
  }
`);

export default function AttendancePage() {
  const { data: queryData, loading } = useQuery(GET_ALL_ATTENDANCE, {
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
    if (!queryData?.getAllAttendance?.data?.attendanceRecords) return [];
    return queryData.getAllAttendance.data.attendanceRecords.map((record: any) => ({
      id: record.id || "",
      date: record.date ? new Date(record.date).toISOString().split("T")[0] : "",
      clockIn: record.clockInTime
        ? new Date(record.clockInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "—",
      clockOut: record.clockOutTime
        ? new Date(record.clockOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "—",
      status: (record.status?.toLowerCase() || "present") as AttendanceRecord["status"],
      workingHours: record.totalHours || 0,
      location: "Office",
    }));
  }, [queryData]);


  const filters: FilterConfig = [
    { type: "search", placeholder: "Search by location..." },
    {
      type: "checkboxGroup",
      columnId: "status",
      label: "Status",
      options: [
        { label: "Present", value: "present" },
        { label: "Absent", value: "absent" },
        { label: "Late", value: "late" },
        { label: "Half Day", value: "half-day" },
        { label: "On Leave", value: "on-leave" },
      ],
    },
    { type: "dateRange", columnId: "date", label: "Date Range" },
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
                Attendance
              </h1>
            </div>
            <button className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Clock In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading attendance data...</p>
          </div>
        ) : (
          <DataTable<AttendanceRecord>
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
