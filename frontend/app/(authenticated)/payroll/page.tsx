'use client';

import { DataTable, FilterConfig } from "@/components/table/DataTable";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";
import { useSession } from "@/context/SessionContext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type PayrollRow = {
  id: string;
  periodEnd: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: string;
  currency: string;
};

const GET_ALL_PAYROLLS = graphql(`
  query GetAllPayrollsPage($request: GetAllPayrollsRequestInput!) {
    allPayrolls(request: $request) {
      data {
        payrolls {
          payrollId
          userId
          payPeriodStart
          payPeriodEnd
          grossPay
          totalDeductions
          netPay
          currency
          status
          basicSalary
        }
      }
    }
  }
`);

const CREATE_PAYROLL = graphql(`
  mutation PayPageCreate($request: CreatePayrollRequestInput!) {
    createPayroll(request: $request) { data { payrollId } }
  }
`);

const UPDATE_PAYROLL = graphql(`
  mutation PayPageUpdate($request: UpdatePayrollRequestInput!) {
    updatePayroll(request: $request) { data { payrollId } }
  }
`);

const DELETE_PAYROLL = graphql(`
  mutation PayPageDelete($request: DeletePayrollRequestInput!) {
    deletePayroll(request: $request) { data { payrollId } }
  }
`);

type ModalMode = 'create' | 'edit' | null;

export default function PayrollPage() {
  const { user } = useSession();
  const { data: queryData, loading, refetch } = useQuery(GET_ALL_PAYROLLS, {
    variables: { request: { pageCriteria: { enablePage: true, pageSize: 100, skip: 0 } } },
  });

  const [createPayroll, { loading: creating }] = useMutation(CREATE_PAYROLL);
  const [updatePayroll, { loading: updating }] = useMutation(UPDATE_PAYROLL);
  const [deletePayroll] = useMutation(DELETE_PAYROLL);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editId, setEditId] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const emptyForm = { payPeriodEnd: today, basicSalary: '', grossPay: '', totalDeductions: '', netPay: '', currency: 'USD', status: 'Draft' };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => { setForm(emptyForm); setEditId(''); setModalMode('create'); };
  const openEdit = (row: any) => {
    const raw = queryData?.allPayrolls?.data?.payrolls?.find((p: any) => p.payrollId === row.id);
    if (!raw) return;
    setEditId(raw.payrollId!);
    setForm({
      payPeriodEnd: raw.payPeriodEnd ? new Date(raw.payPeriodEnd).toISOString().split('T')[0] : today,
      basicSalary: String(raw.basicSalary || 0), grossPay: String(raw.grossPay || 0),
      totalDeductions: String(raw.totalDeductions || 0), netPay: String(raw.netPay || 0),
      currency: raw.currency || 'USD', status: raw.status || 'Draft',
    });
    setModalMode('edit');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this payroll record?')) return;
    try { await deletePayroll({ variables: { request: { requestParam: { payrollId: id } } } }); refetch(); } catch { alert('Failed to delete.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const end = new Date(form.payPeriodEnd);
    const start = new Date(end); start.setDate(1);
    const payload = {
      userId: user.id, payPeriodStart: start.toISOString(), payPeriodEnd: end.toISOString(),
      basicSalary: Number(form.basicSalary), grossPay: Number(form.grossPay),
      totalDeductions: Number(form.totalDeductions), netPay: Number(form.netPay),
      currency: form.currency, status: form.status,
    };
    try {
      if (modalMode === 'create') {
        await createPayroll({ variables: { request: { requestParam: payload } } });
      } else {
        await updatePayroll({ variables: { request: { requestParam: { payrollId: editId, ...payload } } } });
      }
      setModalMode(null);
      refetch();
    } catch { alert('Failed to save.'); }
  };

  const columns: any[] = [
    { accessorKey: "periodEnd", header: "Pay Period End", cell: ({ getValue }: any) => <span className="tabular-nums">{new Date(getValue()).toLocaleDateString()}</span> },
    { accessorKey: "grossPay", header: "Gross Pay", cell: ({ getValue }: any) => <span className="tabular-nums font-medium">${getValue().toLocaleString()}</span> },
    { accessorKey: "deductions", header: "Deductions", cell: ({ getValue }: any) => <span className="tabular-nums text-red-600">${getValue().toLocaleString()}</span> },
    { accessorKey: "netPay", header: "Net Pay", cell: ({ getValue }: any) => <span className="tabular-nums font-bold text-green-700">${getValue().toLocaleString()}</span> },
    { accessorKey: "status", header: "Status", cell: ({ getValue }: any) => {
      const s = getValue();
      const c: any = { Paid: 'bg-green-100 text-green-800', Draft: 'bg-gray-100 text-gray-800', Processing: 'bg-blue-100 text-blue-800' };
      return <span className={`rounded px-2 py-0.5 text-xs font-medium ${c[s] || 'bg-gray-100'}`}>{s}</span>;
    }},
    { id: "actions", header: "Actions", cell: ({ row }: any) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(row.original)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Pencil size={16} /></button>
        <button onClick={() => handleDelete(row.original.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
      </div>
    )},
  ];

  const data = useMemo(() => {
    if (!queryData?.allPayrolls?.data?.payrolls) return [];
    return queryData.allPayrolls.data.payrolls.map((p: any) => ({
      id: p.payrollId, periodEnd: p.payPeriodEnd ? new Date(p.payPeriodEnd).toISOString().split('T')[0] : '',
      grossPay: p.grossPay || 0, deductions: p.totalDeductions || 0, netPay: p.netPay || 0,
      status: p.status || 'Draft', currency: p.currency || 'USD',
    }));
  }, [queryData]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search..." },
    { type: "checkboxGroup", columnId: "status", label: "Status", options: [
      { label: "Draft", value: "Draft" }, { label: "Paid", value: "Paid" }, { label: "Processing", value: "Processing" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-sm text-[#FF5A5F] hover:underline">← Back to Dashboard</Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Payroll</h1>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-[#FF5A5F] px-4 py-2 text-white hover:bg-[#ff474d] transition-colors font-medium"><Plus size={18} /> Create Payslip</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? <p className="text-center py-12 text-slate-500">Loading...</p> : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <DataTable<PayrollRow> data={data} columns={columns} pageSizeOptions={[10, 20, 50]} initialPageSize={10} filters={filters} className="rounded-md border-none" />
          </div>
        )}
      </main>
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{modalMode === 'create' ? 'Create Payslip' : 'Edit Payslip'}</h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full p-1.5 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Pay Period End</label><input type="date" value={form.payPeriodEnd} onChange={e => setForm({...form, payPeriodEnd: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Basic Salary ($)</label><input type="number" value={form.basicSalary} onChange={e => setForm({...form, basicSalary: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" placeholder="5000" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Gross Pay ($)</label><input type="number" value={form.grossPay} onChange={e => setForm({...form, grossPay: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" placeholder="6000" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Deductions ($)</label><input type="number" value={form.totalDeductions} onChange={e => setForm({...form, totalDeductions: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" placeholder="800" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Net Pay ($)</label><input type="number" value={form.netPay} onChange={e => setForm({...form, netPay: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" placeholder="5200" /></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                  <option>Draft</option><option>Processing</option><option>Paid</option>
                </select>
              </div>
              <button type="submit" disabled={creating || updating} className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2">
                {(creating || updating) ? 'Saving...' : modalMode === 'create' ? 'Create Payslip' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
