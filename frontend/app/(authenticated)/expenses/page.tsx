'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, FilterConfig } from "@/components/table/DataTable";
import { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";

type Expense = {
  id: string;
  date: string;
  category: "travel" | "food" | "accommodation" | "communication" | "medical" | "office-supplies" | "other";
  amount: number;
  description: string;
  status: "draft" | "submitted" | "pending-approval" | "approved" | "rejected" | "paid";
  approvedBy: string;
};

const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const dateVal = getValue<string>();
      if (!dateVal) return <span className="text-slate-400">—</span>;
      const date = new Date(dateVal);
      return <span className="tabular-nums">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => {
      const category = getValue<Expense["category"]>();
      return <span className="capitalize">{(category || "").replace("-", " ")}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const desc = getValue<string>();
      return <span className="truncate">{desc || "—"}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Expense["status"]>();
      const colors: Record<Expense["status"], string> = {
        draft: "bg-gray-100 text-gray-800",
        submitted: "bg-blue-100 text-blue-800",
        "pending-approval": "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        paid: "bg-purple-100 text-purple-800",
      };
      return (
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
          {(status || "").charAt(0).toUpperCase() + (status || "").slice(1).replace("-", " ")}
        </span>
      );
    },
  },
];

const GET_ALL_EXPENSES = graphql(`
  query GetAllExpenses($request: GetAllExpensesRequestInput!) {
    allExpenses(request: $request) {
      data {
        expenses {
          expenseId
          expenseDate
          category
          amount
          currency
          description
          status
          approvedByUserId
        }
      }
    }
  }
`);

export default function ExpensesPage() {
  const { data: queryData, loading } = useQuery(GET_ALL_EXPENSES, {
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
    if (!queryData?.allExpenses?.data?.expenses) return [];
    return queryData.allExpenses.data.expenses.map((record: any) => ({
      id: record.expenseId || "",
      date: record.expenseDate ? new Date(record.expenseDate).toISOString().split("T")[0] : "",
      category: (record.category?.toLowerCase() || "other") as Expense["category"],
      amount: Number(record.amount || 0),
      description: record.description || "",
      status: (record.status?.toLowerCase() || "draft") as Expense["status"],
      approvedBy: record.approvedByUserId || "Manager",
    }));
  }, [queryData]);

  // Compute expense summary metrics
  const summary = useMemo(() => {
    let totalSubmitted = 0;
    let pendingApproval = 0;
    let approved = 0;
    let rejected = 0;

    data.forEach((exp) => {
      if (exp.status === "submitted" || exp.status === "pending-approval") {
        pendingApproval += exp.amount;
        totalSubmitted += exp.amount;
      } else if (exp.status === "approved" || exp.status === "paid") {
        approved += exp.amount;
        totalSubmitted += exp.amount;
      } else if (exp.status === "rejected") {
        rejected += exp.amount;
        totalSubmitted += exp.amount;
      } else {
        totalSubmitted += exp.amount;
      }
    });

    return {
      submitted: `$${totalSubmitted.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      pending: `$${pendingApproval.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      approved: `$${approved.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      rejected: `$${rejected.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    };
  }, [data]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search expenses..." },
    {
      type: "checkboxGroup",
      columnId: "category",
      label: "Category",
      options: [
        { label: "Travel", value: "travel" },
        { label: "Food", value: "food" },
        { label: "Accommodation", value: "accommodation" },
        { label: "Communication", value: "communication" },
        { label: "Medical", value: "medical" },
        { label: "Office Supplies", value: "office-supplies" },
        { label: "Other", value: "other" },
      ],
    },
    {
      type: "checkboxGroup",
      columnId: "status",
      label: "Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Submitted", value: "submitted" },
        { label: "Pending Approval", value: "pending-approval" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Paid", value: "paid" },
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
                Expenses & Reimbursements
              </h1>
            </div>
            <button className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
              Submit Expense
            </button>
          </div>
        </div>
      </header>

      {/* Expense Summary */}
      <div className="border-b border-teal-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Expense Summary
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Total Submitted", amount: summary.submitted, color: "bg-blue-100 text-blue-800" },
              { label: "Pending Approval", amount: summary.pending, color: "bg-yellow-100 text-yellow-800" },
              { label: "Approved", amount: summary.approved, color: "bg-green-100 text-green-800" },
              { label: "Rejected", amount: summary.rejected, color: "bg-red-100 text-red-800" },
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
            <p className="text-slate-500">Loading expenses...</p>
          </div>
        ) : (
          <DataTable<Expense>
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

