'use client';

import { DataTable, FilterConfig } from "@/components/table/DataTable";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";
import { useSession } from "@/context/SessionContext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type AttendanceRecord = {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: "present" | "absent" | "late" | "half-day" | "on-leave";
  workingHours: number;
  location: string;
};

const GET_ALL_ATTENDANCE = graphql(`
  query GetAllAttendancePage($request: GetAllAttendanceRequestInput!) {
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

const CREATE_ATTENDANCE = graphql(`
  mutation AttPageCreate($request: CreateAttendanceRequestInput!) {
    createAttendance(request: $request) {
      data { attendanceId }
    }
  }
`);

const UPDATE_ATTENDANCE = graphql(`
  mutation AttPageUpdate($request: UpdateAttendanceRequestInput!) {
    updateAttendance(request: $request) {
      data { attendanceId }
    }
  }
`);

const DELETE_ATTENDANCE = graphql(`
  mutation AttPageDelete($request: DeleteAttendanceRequestInput!) {
    deleteAttendance(request: $request) {
      data { attendanceId }
    }
  }
`);

type ModalMode = 'create' | 'edit' | null;

export default function AttendancePage() {
  const { user } = useSession();
  const { data: queryData, loading, refetch } = useQuery(GET_ALL_ATTENDANCE, {
    variables: { request: { pageCriteria: { enablePage: true, pageSize: 100, skip: 0 } } },
  });

  const [createAttendance, { loading: creating }] = useMutation(CREATE_ATTENDANCE);
  const [updateAttendance, { loading: updating }] = useMutation(UPDATE_ATTENDANCE);
  const [deleteAttendance] = useMutation(DELETE_ATTENDANCE);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editId, setEditId] = useState('');
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], clockInTime: '09:00', clockOutTime: '17:00', status: 'Present' });

  const openCreate = () => { setForm({ date: new Date().toISOString().split('T')[0], clockInTime: '09:00', clockOutTime: '17:00', status: 'Present' }); setEditId(''); setModalMode('create'); };
  const openEdit = (record: any) => {
    const raw = queryData?.getAllAttendance?.data?.attendanceRecords?.find((r: any) => r.id === record.id);
    if (!raw) return;
    setEditId(raw.id);
    setForm({
      date: raw.date ? new Date(raw.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      clockInTime: raw.clockInTime ? new Date(raw.clockInTime).toTimeString().slice(0,5) : '09:00',
      clockOutTime: raw.clockOutTime ? new Date(raw.clockOutTime).toTimeString().slice(0,5) : '17:00',
      status: raw.status || 'Present',
    });
    setModalMode('edit');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attendance record?')) return;
    try {
      await deleteAttendance({ variables: { request: { requestParam: { attendanceId: id } } } });
      refetch();
    } catch { alert('Failed to delete.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const clockIn = new Date(`${form.date}T${form.clockInTime}:00`);
    const clockOut = new Date(`${form.date}T${form.clockOutTime}:00`);
    try {
      if (modalMode === 'create') {
        await createAttendance({ variables: { request: { requestParam: { employeeId: user.id, date: new Date(form.date).toISOString(), clockInTime: clockIn.toISOString(), clockOutTime: clockOut.toISOString(), status: form.status } } } });
      } else {
        await updateAttendance({ variables: { request: { requestParam: { attendanceId: editId, employeeId: user.id, date: new Date(form.date).toISOString(), clockInTime: clockIn.toISOString(), clockOutTime: clockOut.toISOString(), status: form.status } } } });
      }
      setModalMode(null);
      refetch();
    } catch { alert('Failed to save.'); }
  };

  const columns: any[] = [
    { accessorKey: "date", header: "Date", cell: ({ getValue }: any) => <span className="tabular-nums">{new Date(getValue()).toLocaleDateString()}</span> },
    { accessorKey: "clockIn", header: "Clock In", cell: ({ getValue }: any) => <span className="tabular-nums">{getValue() || "—"}</span> },
    { accessorKey: "clockOut", header: "Clock Out", cell: ({ getValue }: any) => <span className="tabular-nums">{getValue() || "—"}</span> },
    { accessorKey: "workingHours", header: "Working Hours", cell: ({ getValue }: any) => <span className="tabular-nums">{getValue().toFixed(2)}h</span> },
    { accessorKey: "status", header: "Status", cell: ({ getValue }: any) => {
      const s = getValue();
      const c: any = { present: "bg-green-100 text-green-800", absent: "bg-red-100 text-red-800", late: "bg-yellow-100 text-yellow-800", "half-day": "bg-blue-100 text-blue-800", "on-leave": "bg-purple-100 text-purple-800" };
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
    if (!queryData?.getAllAttendance?.data?.attendanceRecords) return [];
    return queryData.getAllAttendance.data.attendanceRecords.map((r: any) => ({
      id: r.id || "", date: r.date ? new Date(r.date).toISOString().split("T")[0] : "",
      clockIn: r.clockInTime ? new Date(r.clockInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
      clockOut: r.clockOutTime ? new Date(r.clockOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
      status: (r.status?.toLowerCase() || "present") as AttendanceRecord["status"],
      workingHours: r.totalHours || 0, location: "Office",
    }));
  }, [queryData]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search..." },
    { type: "checkboxGroup", columnId: "status", label: "Status", options: [
      { label: "Present", value: "present" }, { label: "Absent", value: "absent" }, { label: "Late", value: "late" }, { label: "Half Day", value: "half-day" }, { label: "On Leave", value: "on-leave" },
    ]},
    { type: "dateRange", columnId: "date", label: "Date Range" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-sm text-[#FF5A5F] hover:underline">← Back to Dashboard</Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Attendance</h1>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-[#FF5A5F] px-4 py-2 text-white hover:bg-[#ff474d] transition-colors font-medium">
              <Plus size={18} /> Add Record
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? <div className="flex items-center justify-center py-12"><p className="text-slate-500">Loading...</p></div> : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <DataTable<AttendanceRecord> data={data} columns={columns} pageSizeOptions={[10, 20, 50]} initialPageSize={10} filters={filters} className="rounded-md border-none" />
          </div>
        )}
      </main>
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{modalMode === 'create' ? 'Add Attendance' : 'Edit Attendance'}</h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full p-1.5 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Date</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Clock In</label><input type="time" value={form.clockInTime} onChange={e => setForm({...form, clockInTime: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Clock Out</label><input type="time" value={form.clockOutTime} onChange={e => setForm({...form, clockOutTime: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                  <option value="Present">Present</option><option value="Late">Late</option><option value="Half-day">Half Day</option><option value="Absent">Absent</option>
                </select>
              </div>
              <button type="submit" disabled={creating || updating} className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2">
                {(creating || updating) ? 'Saving...' : modalMode === 'create' ? 'Add Record' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
