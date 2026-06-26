'use client';

import { DataTable, FilterConfig } from "@/components/table/DataTable";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client/react";
import { graphql } from "@/graphql/generated";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type EmployeeRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
};

const GET_ALL_EMPLOYEES = graphql(`
  query GetAllEmployeesPage($request: GetAllEmployeesRequestInput!) {
    getAllEmployees(request: $request) {
      data {
        employees {
          id
          firstName
          lastName
          email
          phone
          designation
          department
          role
          status
          country
        }
      }
    }
  }
`);

const CREATE_EMPLOYEE = graphql(`
  mutation EmpPageCreate($request: CreateEmployeeRequestInput!) {
    createEmployee(request: $request) { data { employeeId } }
  }
`);

const UPDATE_EMPLOYEE = graphql(`
  mutation EmpPageUpdate($request: UpdateEmployeeRequestInput!) {
    updateEmployee(request: $request) { data { employeeId } }
  }
`);

const DELETE_EMPLOYEE = graphql(`
  mutation EmpPageDelete($request: DeleteEmployeeRequestInput!) {
    deleteEmployee(request: $request) { data { employeeId } }
  }
`);

type ModalMode = 'create' | 'edit' | null;

export default function TeamPage() {
  const { data: queryData, loading, refetch } = useQuery(GET_ALL_EMPLOYEES, {
    variables: { request: { pageCriteria: { enablePage: true, pageSize: 100, skip: 0 } } },
  });

  const [createEmployee, { loading: creating }] = useMutation(CREATE_EMPLOYEE);
  const [updateEmployee, { loading: updating }] = useMutation(UPDATE_EMPLOYEE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editId, setEditId] = useState('');
  const emptyForm = { firstName: '', lastName: '', email: '', phone: '', designation: '', department: 'Engineering', role: 'Employee', status: 'Active', country: '' };
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => { setForm(emptyForm); setEditId(''); setModalMode('create'); };
  const openEdit = (row: any) => {
    const raw = queryData?.getAllEmployees?.data?.employees?.find((e: any) => e.id === row.id);
    if (!raw) return;
    setEditId(raw.id);
    setForm({
      firstName: raw.firstName || '', lastName: raw.lastName || '', email: raw.email || '',
      phone: raw.phone || '', designation: raw.designation || '', department: raw.department || 'Engineering',
      role: raw.role || 'Employee', status: raw.status || 'Active', country: raw.country || '',
    });
    setModalMode('edit');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this employee?')) return;
    try { await deleteEmployee({ variables: { request: { requestParam: { employeeId: id } } } }); refetch(); } catch { alert('Failed to delete.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        await createEmployee({ variables: { request: { requestParam: { ...form, dateOfJoining: new Date().toISOString() } } } });
      } else {
        await updateEmployee({ variables: { request: { requestParam: { employeeId: editId, ...form, dateOfJoining: new Date().toISOString() } } } });
      }
      setModalMode(null);
      refetch();
    } catch { alert('Failed to save.'); }
  };

  const columns: any[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }: any) => {
      const s = getValue();
      const c = s === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
      return <span className={`rounded px-2 py-0.5 text-xs font-medium ${c}`}>{s}</span>;
    }},
    { id: "actions", header: "Actions", cell: ({ row }: any) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(row.original)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Pencil size={16} /></button>
        <button onClick={() => handleDelete(row.original.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
      </div>
    )},
  ];

  const data = useMemo(() => {
    if (!queryData?.getAllEmployees?.data?.employees) return [];
    return queryData.getAllEmployees.data.employees.map((e: any) => ({
      id: e.id, name: `${e.firstName || ''} ${e.lastName || ''}`.trim() || 'N/A',
      email: e.email || '', role: e.role || '', department: e.department || '', status: e.status || 'Active',
    }));
  }, [queryData]);

  const filters: FilterConfig = [
    { type: "search", placeholder: "Search by name or email..." },
    { type: "checkboxGroup", columnId: "role", label: "Role", options: [
      { label: "Employee", value: "Employee" }, { label: "Manager", value: "Manager" }, { label: "Admin", value: "Admin" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-sm text-[#FF5A5F] hover:underline">← Back to Dashboard</Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Employees</h1>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-[#FF5A5F] px-4 py-2 text-white hover:bg-[#ff474d] transition-colors font-medium"><Plus size={18} /> Add Employee</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? <p className="text-center py-12 text-slate-500">Loading...</p> : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <DataTable<EmployeeRow> data={data} columns={columns} pageSizeOptions={[10, 20, 50]} initialPageSize={10} filters={filters} className="rounded-md border-none" />
          </div>
        )}
      </main>
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{modalMode === 'create' ? 'Add Employee' : 'Edit Employee'}</h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full p-1.5 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name</label><input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label><input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                    <option>Engineering</option><option>Design</option><option>Marketing</option><option>Sales</option><option>HR</option><option>Finance</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Designation</label><input type="text" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none" placeholder="e.g. Software Engineer" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                    <option>Employee</option><option>Manager</option><option>Admin</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none">
                    <option>Active</option><option>Inactive</option><option>On Leave</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={creating || updating} className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2">
                {(creating || updating) ? 'Saving...' : modalMode === 'create' ? 'Add Employee' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
