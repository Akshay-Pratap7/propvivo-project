'use client';

import { useSession } from '@/context/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { graphql } from '@/graphql/generated';
import { Users, UserCheck, CalendarOff, Clock, FileText, ChevronRight, UserPlus, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// GraphQL Queries and Mutations
const GET_DASHBOARD_STATS = graphql(`
  query GetDashboardStats(
    $employeeReq: GetAllEmployeesRequestInput!
    $attendanceReq: GetAllAttendanceRequestInput!
    $leaveReq: GetAllLeavesRequestInput!
    $docReq: GetAllDocumentsRequestInput!
    $payrollReq: GetAllPayrollsRequestInput!
    $goalsReq: GetAllGoalsRequestInput!
    $trainingReq: GetAllTrainingModulesRequestInput!
    $annReq: GetAllAnnouncementsRequestInput!
  ) {
    getAllEmployees(request: $employeeReq) {
      data {
        employees {
          id
          firstName
          lastName
          email
          role
          status
        }
      }
    }
    getAllAttendance(request: $attendanceReq) {
      data {
        attendanceRecords {
          id
          date
          status
        }
      }
    }
    getAllLeaves(request: $leaveReq) {
      data {
        leaves {
          id
          leaveType
          totalDays
          status
        }
      }
    }
    allDocuments(request: $docReq) {
      data {
        documents {
          status
        }
      }
    }
    allPayrolls(request: $payrollReq) {
      data {
        payrolls {
          payPeriodEnd
          netPay
        }
      }
    }
    goals(request: $goalsReq) {
      items {
        id
        currentValue
        targetValue
      }
    }
    trainingModules(request: $trainingReq) {
      items {
        id
      }
    }
    announcements(request: $annReq) {
      items {
        id
      }
    }
  }
`);

const CREATE_LEAVE = graphql(`
  mutation DashboardCreateLeave($request: CreateLeaveRequestInput!) {
    createLeave(request: $request) {
      data {
        leaveId
      }
    }
  }
`);

const CREATE_EMPLOYEE = graphql(`
  mutation DashboardCreateEmployee($request: CreateEmployeeRequestInput!) {
    createEmployee(request: $request) {
      data {
        employeeId
      }
    }
  }
`);

const CREATE_PAYROLL = graphql(`
  mutation DashboardCreatePayroll($request: CreatePayrollRequestInput!) {
    createPayroll(request: $request) {
      data {
        payrollId
      }
    }
  }
`);

const attendanceData = [
  { name: 'Mon', present: 85, absent: 5 },
  { name: 'Tue', present: 88, absent: 2 },
  { name: 'Wed', present: 90, absent: 1 },
  { name: 'Thu', present: 86, absent: 4 },
  { name: 'Fri', present: 84, absent: 6 },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useSession();
  const router = useRouter();

  // Redirect if unauthenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const defaultPageCriteria = { enablePage: true, pageSize: 10, skip: 0 };

  const { data: statsData, loading, refetch } = useQuery(GET_DASHBOARD_STATS, {
    skip: !isAuthenticated,
    variables: {
      employeeReq: { pageCriteria: defaultPageCriteria },
      attendanceReq: { pageCriteria: defaultPageCriteria },
      leaveReq: { pageCriteria: defaultPageCriteria },
      docReq: { pageCriteria: defaultPageCriteria },
      payrollReq: { pageCriteria: defaultPageCriteria },
      goalsReq: { pageCriteria: defaultPageCriteria },
      trainingReq: { pageCriteria: defaultPageCriteria },
      annReq: { pageCriteria: defaultPageCriteria }
    }
  });

  const [activeModal, setActiveModal] = useState<'request_leave' | 'add_member' | 'generate_payslip' | null>(null);

  // Form states
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [leaveStart, setLeaveStart] = useState(new Date().toISOString().split('T')[0]);
  const [leaveEnd, setLeaveEnd] = useState(new Date().toISOString().split('T')[0]);
  const [leaveReason, setLeaveReason] = useState('');

  const [empFirstName, setEmpFirstName] = useState('');
  const [empLastName, setEmpLastName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empRole, setEmpRole] = useState('Employee');

  const [payPeriodEnd, setPayPeriodEnd] = useState(new Date().toISOString().split('T')[0]);
  const [payBasic, setPayBasic] = useState('');
  const [payNet, setPayNet] = useState('');

  const [createLeave, { loading: leaveLoading }] = useMutation(CREATE_LEAVE);
  const [createEmployee, { loading: empLoading }] = useMutation(CREATE_EMPLOYEE);
  const [createPayroll, { loading: payLoading }] = useMutation(CREATE_PAYROLL);

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const start = new Date(leaveStart);
      const end = new Date(leaveEnd);
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      await createLeave({
        variables: {
          request: {
            requestParam: {
              employeeId: user.id,
              leaveType,
              startDate: start.toISOString(),
              endDate: end.toISOString(),
              totalDays: Number(totalDays),
              reason: leaveReason,
              status: "Pending"
            }
          }
        }
      });
      alert("Leave requested successfully!");
      refetch();
      setActiveModal(null);
    } catch (err: any) {
      alert("Failed to request leave.");
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await createEmployee({
        variables: {
          request: {
            requestParam: {
              firstName: empFirstName,
              lastName: empLastName,
              email: empEmail,
              role: empRole,
              status: "Active",
              dateOfJoining: new Date().toISOString()
            }
          }
        }
      });
      alert("Member added successfully!");
      refetch();
      setActiveModal(null);
    } catch (err: any) {
      alert("Failed to add member.");
    }
  };

  const handlePayrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const end = new Date(payPeriodEnd);
      const start = new Date(end);
      start.setDate(1); // Start of month

      await createPayroll({
        variables: {
          request: {
            requestParam: {
              userId: user.id,
              payPeriodStart: start.toISOString(),
              payPeriodEnd: end.toISOString(),
              basicSalary: Number(payBasic),
              grossPay: Number(payBasic),
              netPay: Number(payNet),
              totalDeductions: Number(payBasic) - Number(payNet),
              currency: "USD",
              status: "Paid",
              payslipUrl: "https://mockstorage.propvivo.com/payslip.pdf"
            }
          }
        }
      });
      alert("Payslip generated successfully!");
      refetch();
      setActiveModal(null);
    } catch (err: any) {
      alert("Failed to generate payslip.");
    }
  };

  const stats = useMemo(() => {
    const employees = statsData?.getAllEmployees?.data?.employees || [];
    const attRecords = statsData?.getAllAttendance?.data?.attendanceRecords || [];
    const presentToday = attRecords.filter((r: any) => r.status === 'Present').length;
    
    const leaves = statsData?.getAllLeaves?.data?.leaves || [];
    const onLeave = leaves.filter((l: any) => l.status === 'Approved').length;
    const pendingReqs = leaves.filter((l: any) => l.status === 'Pending').length;

    return {
      employees,
      totalEmployees: employees.length > 0 ? employees.length : 124, // Demo baseline 124
      presentToday: presentToday > 0 ? presentToday : 118,
      onLeave: onLeave > 0 ? onLeave : 4,
      pendingReqs: pendingReqs > 0 ? pendingReqs : 7,
      recentLeaves: leaves.slice(0, 5)
    };
  }, [statsData]);

  if (!isAuthenticated || loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Employees</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.totalEmployees}</h3>
            </div>
            <div className="bg-[#FF5A5F]/10 p-3 rounded-lg text-[#FF5A5F]">
              <Users size={24} />
            </div>
          </div>
          <p className="text-sm text-emerald-600 mt-4 flex items-center"><span className="font-medium mr-1">+2%</span> from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Present Today</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.presentToday}</h3>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
              <UserCheck size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">95% Attendance Rate</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">On Leave</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.onLeave}</h3>
            </div>
            <div className="bg-rose-100 p-3 rounded-lg text-rose-600">
              <CalendarOff size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">Currently Out of Office</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Requests</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.pendingReqs}</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">Requires your attention</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left / Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Attendance Trend</h2>
              <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="present" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Recent Leave Requests</h2>
              <button className="text-sm font-medium text-[#FF5A5F] hover:underline flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Employee</th>
                    <th className="px-6 py-4 font-medium">Leave Type</th>
                    <th className="px-6 py-4 font-medium">Duration</th>
                    <th className="px-6 py-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentLeaves.length > 0 ? (
                    stats.recentLeaves.map((leave: any, index: number) => {
                      const emp = stats.employees[index % stats.employees.length];
                      const empName = emp ? `${emp.firstName} ${emp.lastName}` : "Demo User";
                      return (
                        <tr key={leave.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{empName}</td>
                          <td className="px-6 py-4">{leave.leaveType || 'Annual Leave'}</td>
                          <td className="px-6 py-4">{leave.totalDays} Days</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                              leave.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {leave.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">Alice Johnson</td>
                      <td className="px-6 py-4">Sick Leave</td>
                      <td className="px-6 py-4">2 Days</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Pending</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right / Sidebar Column */}
        <div className="space-y-8">
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => setActiveModal('request_leave')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-[#FF5A5F]/30 hover:bg-[#FF5A5F]/5 transition-all text-left group"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-md shadow-sm text-slate-600 group-hover:text-[#FF5A5F] mr-3">
                    <CalendarOff size={18} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">Request Leave</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => setActiveModal('add_member')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-[#FF5A5F]/30 hover:bg-[#FF5A5F]/5 transition-all text-left group"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-md shadow-sm text-slate-600 group-hover:text-[#FF5A5F] mr-3">
                    <UserPlus size={18} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">Add Member</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => setActiveModal('generate_payslip')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-[#FF5A5F]/30 hover:bg-[#FF5A5F]/5 transition-all text-left group"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-md shadow-sm text-slate-600 group-hover:text-[#FF5A5F] mr-3">
                    <DollarSign size={18} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">Generate Payslip</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Members List Demo */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Members</h2>
            <div className="space-y-4">
              {stats.employees.slice(0, 3).map((emp: any) => (
                <div key={emp.id} className="flex items-center border-l-4 border-indigo-500 pl-4 py-1">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{emp.firstName} {emp.lastName}</p>
                    <p className="text-sm text-slate-500">{emp.role}</p>
                  </div>
                  <div className="bg-slate-50 px-3 py-1 rounded-md text-sm font-medium text-slate-600">
                    {emp.status}
                  </div>
                </div>
              ))}
              {stats.employees.length === 0 && (
                <p className="text-sm text-slate-500 italic">No members found. Add one!</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                {activeModal === 'request_leave' && 'Request Leave'}
                {activeModal === 'add_member' && 'Add Member'}
                {activeModal === 'generate_payslip' && 'Generate Payslip'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full p-1 transition-colors"
              >
                &times;
              </button>
            </div>

            {activeModal === 'request_leave' && (
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={leaveStart}
                      onChange={(e) => setLeaveStart(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={leaveEnd}
                      onChange={(e) => setLeaveEnd(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                  <textarea
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    required
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none resize-none"
                    placeholder="Provide a reason..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={leaveLoading}
                  className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2"
                >
                  {leaveLoading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}

            {activeModal === 'add_member' && (
              <form onSubmit={handleEmployeeSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={empFirstName}
                      onChange={(e) => setEmpFirstName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={empLastName}
                      onChange={(e) => setEmpLastName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={empLoading}
                  className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2"
                >
                  {empLoading ? 'Adding...' : 'Add Member'}
                </button>
              </form>
            )}

            {activeModal === 'generate_payslip' && (
              <form onSubmit={handlePayrollSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pay Period End</label>
                  <input
                    type="date"
                    value={payPeriodEnd}
                    onChange={(e) => setPayPeriodEnd(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Basic Salary ($)</label>
                  <input
                    type="number"
                    value={payBasic}
                    onChange={(e) => setPayBasic(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Net Pay ($)</label>
                  <input
                    type="number"
                    value={payNet}
                    onChange={(e) => setPayNet(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] outline-none"
                    placeholder="4200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={payLoading}
                  className="w-full rounded-lg bg-[#FF5A5F] py-2.5 text-white font-medium hover:bg-[#ff474d] disabled:opacity-50 transition-colors mt-2"
                >
                  {payLoading ? 'Generating...' : 'Generate Payslip'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
