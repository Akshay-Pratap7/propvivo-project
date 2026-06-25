'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, FilterConfig } from "../../components/table/DataTable";
import { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "../../graphql/generated";

type PayrollRecord = {
  id: string;
  payPeriod: string;
  grossPay: number;
  totalDeductions: number;
  netPay: number;
  status: "draft" | "processing" | "approved" | "paid";
  country: "US" | "IN";
};

const columns: ColumnDef<PayrollRecord>[] = [
  {
    accessorKey: "payPeriod",
    header: "Pay Period",
    cell: ({ getValue }) => {
      const period = getValue<string>();
      return <span className="font-medium">{period}</span>;
    },
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ getValue }) => {
      const country = getValue<string>();
      return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-700">
          {country}
        </span>
      );
    },
  },
  {
    accessorKey: "grossPay",
    header: "Gross Pay",
    cell: ({ getValue }) => {
      const amount = getValue<number>();
      return (
        <span className="tabular-nums font-medium">
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      );
    },
  },
  {
    accessorKey: "totalDeductions",
    header: "Deductions",
    cell: ({ getValue }) => {
      const amount = getValue<number>();
      return (
        <span className="tabular-nums text-red-600">
          -${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      );
    },
  },
  {
    accessorKey: "netPay",
    header: "Net Pay",
    cell: ({ getValue }) => {
      const amount = getValue<number>();
      return (
        <span className="tabular-nums font-bold text-green-600">
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<PayrollRecord["status"]>();
      const colors: Record<PayrollRecord["status"], string> = {
        draft: "bg-gray-100 text-gray-800",
        processing: "bg-blue-100 text-blue-800",
        approved: "bg-green-100 text-green-800",
        paid: "bg-purple-100 text-purple-800",
      };
      return (
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
          {(status || "").charAt(0).toUpperCase() + (status || "").slice(1)}
        </span>
      );
    },
  },
];

const GET_ALL_PAYROLLS = graphql(`
  query GetAllPayrolls($request: GetAllPayrollsRequestInput!) {
    allPayrolls(request: $request) {
      data {
        payrolls {
          payrollId
          payPeriodStart
          payPeriodEnd
          grossPay
          totalDeductions
          netPay
          countryCode
          status
        }
      }
    }
  }
`);

export default function PayrollPage() {
  const { data: queryData, loading } = useQuery(GET_ALL_PAYROLLS, {
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
    if (!queryData?.allPayrolls?.data?.payrolls) return [];
    return queryData.allPayrolls.data.payrolls.map((record: any) => {
      const start = new Date(record.payPeriodStart);
      const end = new Date(record.payPeriodEnd);
      const payPeriod = `${start.toLocaleString("en-US", { month: "short", year: "numeric" })}`;
      return {
        id: record.payrollId || "",
        payPeriod,
        grossPay: Number(record.grossPay || 0),
        totalDeductions: Number(record.totalDeductions || 0),
        netPay: Number(record.netPay || 0),
        status: (record.status?.toLowerCase() || "draft") as PayrollRecord["status"],
        country: (record.countryCode || "US") as PayrollRecord["country"],
      };
    });
  }, [queryData]);

  // Compute summary values from fetched payrolls
  const summary = useMemo(() => {
    if (data.length === 0) {
      return { gross: "$0.00", deductions: "$0.00", net: "$0.00", status: "N/A" };
    }
    const latest = data[0]; // Assuming latest is first
    return {
      gross: `$${latest.grossPay.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      deductions: `$${latest.totalDeductions.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      net: `$${latest.netPay.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      status: latest.status.charAt(0).toUpperCase() + latest.status.slice(1),
    };
  }, [data]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search payroll..." },
    {
      type: "checkboxGroup",
      columnId: "country",
      label: "Country",
      options: [
        { label: "United States", value: "US" },
        { label: "India", value: "IN" },
      ],
    },
    {
      type: "checkboxGroup",
      columnId: "status",
      label: "Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Processing", value: "processing" },
        { label: "Approved", value: "approved" },
        { label: "Paid", value: "paid" },
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
                Payroll & Payslips
              </h1>
            </div>
            <button className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
              Download Payslip
            </button>
          </div>
        </div>
      </header>

      {/* Payroll Summary */}
      <div className="border-b border-teal-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Current Month Summary
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Gross Pay", amount: summary.gross, color: "bg-blue-100 text-blue-800" },
              { label: "Deductions", amount: summary.deductions, color: "bg-red-100 text-red-800" },
              { label: "Net Pay", amount: summary.net, color: "bg-green-100 text-green-800" },
              { label: "Status", amount: summary.status, color: "bg-purple-100 text-purple-800" },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-lg p-4 ${item.color}`}
              >
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-2 text-2xl font-bold">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading payroll records...</p>
          </div>
        ) : (
          <DataTable<PayrollRecord>
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

