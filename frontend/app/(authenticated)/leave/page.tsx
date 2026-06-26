'use client';

import { DataTable, FilterConfig } from "@/components/table/DataTable";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";
import { useSession } from "@/context/SessionContext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type LeaveRow = {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
};

const GET_ALL_LEAVES = graphql(`
  query GetAllLeavesPage($request: GetAllLeavesRequestInput!) {
    getAllLeaves(request: $request) {
      data {
        leaves {
          id
          employeeId
          leaveType
          startDate
          endDate
          totalDays
          reason
          status
        }
      }
    }
  }
`);

const CREATE_LEAVE = graphql(`
  mutation LeavePageCreate($request: CreateLeaveRequestInput!) {
    createLeave(request: $request) { data { leaveId } }
  }
`);

const UPDATE_LEAVE = graphql(`
  mutation LeavePageUpdate($request: UpdateLeaveRequestInput!) {
    updateLeave(request: $request) { data { leaveId } }
  }
`);

const DELETE_LEAVE = graphql(`
  mutation LeavePageDelete($request: DeleteLeaveRequestInput!) {
    deleteLeave(request: $request) { data { leaveId } }
  }
`);

type ModalMode = 'create' | 'edit' | null;

export default function LeavePage() {
  const { user } = useSession();
  const { data: queryData, loading, refetch } = useQuery(GET_ALL_LEAVES, {
    variables: { request: { pageCriteria: { enablePage: true, pageSize: 100, skip: 0 } } },
  });

  const [createLeave, { loading: creating }] = useMutation(CREATE_LEAVE);
  const [updateLeave, { loading: updating }] = useMutation(UPDATE_LEAVE);
  const [deleteLeave] = useMutation(DELETE_LEAVE);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editId, setEditId] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ leaveType: 'Sick Leave', startDate: today, endDate: today, reason: '', status: 'Pending' });

  const openCreate = () => { setForm({ leaveType: 'Sick Leave', startDate: today, endDate: today, reason: '', status: 'Pending' }); setEditId(''); setModalMode('create'); };
  const openEdit = (row: any) => {
    const raw = queryData?.getAllLeaves?.data?.leaves?.find((l: any) => l.id === row.id);
    if (!raw) return;
    setEditId(raw.id);
    setForm({
      leaveType: raw.leaveType || 'Sick Leave',
      startDate: raw.startDate ? new Date(raw.startDate).toISOString().split('T')[0] : today,
      endDate: raw.endDate ? new Date(raw.endDate).toISOString().split('T')[0] : today,
      reason: raw.reason || '',
      status: raw.status || 'Pending',
    });
    setModalMode('edit');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this leave request?')) return;
    try { await deleteLeave({ variables: { request: { requestParam: { leaveId: id } } } }); refetch(); } catch { alert('Failed to delete.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    try {
      if (modalMode === 'create') {
        await createLeave({ variables: { request: { requestParam: { employeeId: user.id, leaveType: form.leaveType, startDate: start.toISOString(), endDate: end.toISOString(), totalDays, reason: form.reason, status: form.status } } } });
      } else {
        await updateLeave({ variables: { request: { requestParam: { leaveId: editId, employeeId: user.id, leaveType: form.leaveType, startDate: start.toISOString(), endDate: end.toISOString(), totalDays, reason: form.reason, status: form.status } } } });
      }
      setModalMode(null);
      refetch();
    } catch { alert('Failed to save.'); }
  };

  const columns: any[] = [
    { accessorKey: "type", header: "Leave Type" },
    { accessorKey: "startDate", header: "Start Date", cell: ({ getValue }: any) => <span className="tabular-nums">{new Date(getValue()).toLocaleDateString()}</span> },
    { accessorKey: "endDate", header: "End Date", cell: ({ getValue }: any) => <span className="tabular-nums">{new Date(getValue()).toLocaleDateString()}</span> },
    { accessorKey: "days", header: "Days" },
    { accessorKey: "reason", header: "Reason" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }: any) => {
      const s = getValue();
      const c: any = { pending: "bg-amber-100 text-amber-800", approved: "bg-green-100 text-green-800", rejected: "bg-red-100 text-red-800", cancelled: "bg-gray-100 text-gray-800" };
      return <span className={`rounded px-2 py-0.5 text-xs font-medium ${c[s] || 'bg-gray-100'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
    }},
    { id: "actions", header: "Actions", cell: ({ row }: any) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(row.original)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Pencil size={16} /></button>
        <button onClick={() => handleDelete(row.original.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
      </div>
    )},
  ];

  const data = useMemo(() => {
    if (!queryData?.getAllLeaves?.data?.leaves) return [];
    return queryData.getAllLeaves.data.leaves.map((l: any) => ({
      id: l.id, type: l.leaveType || 'Leave',
      startDate: l.startDate ? new Date(l.startDate).toISOString().split('T')[0] : '',
      endDate: l.endDate ? new Date(l.endDate).toISOString().split('T')[0] : '',
      days: l.totalDays || 0, reason: l.reason || '', status: (l.status?.toLowerCase() || 'pending') as LeaveRow['status'],
    }));
  }, [queryData]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search..." },
    { type: "checkboxGroup", columnId: "status", label: "Status", options: [
      { label: "Pending", value: "pending" }, { label: "Approved", value: "approved" }, { label: "Rejected", value: "rejected" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-sm text-[#FF5A5F] hover:underline">← Back to Dashboard</Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Leave Management</h1>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-[#FF5A5F] px-4 py-2 text-white hover:bg-[#ff474d] transition-colors font-medium"><Plus size={18} /> Request Leave</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? <p className="text-center py-12 text-slate-500">Loading...</p> : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <DataTable<LeaveRow> data={data} columns={columns} pageSizeOptions={[10, 20, 50]} initialPageSize={10} filters={filters} className="rounded-md border-none" />
          </div>
        )}
      </main>
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{modalMode === 'create' ? 'Request Leave' : 'Edit Leave'}</h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full p-1.5 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                <select value={form.leaveType} onChange={e => setForm({...form, leaveType: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                  <option>Sick Leave</option><option>Casual Leave</option><option>Annual Leave</option><option>Personal Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label><input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">End Date</label><input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Reason</label><textarea value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} required rows={3} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none resize-none" placeholder="Reason for leave..." /></div>
              {modalMode === 'edit' && (
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                    <option>Pending</option><option>Approved</option><option>Rejected</option>
                  </select>
                </div>
              )}
              <button type="submit" disabled={creating || updating} className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2">
                {(creating || updating) ? 'Saving...' : modalMode === 'create' ? 'Submit Request' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
