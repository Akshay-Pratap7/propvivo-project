/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AnnouncementFilterInput = {
  category?: string | null | undefined;
  isActive?: boolean | null | undefined;
  keyword?: string | null | undefined;
  priority?: string | null | undefined;
  scope?: string | null | undefined;
};

export type CreateAttendanceDtoInput = {
  clockInIP?: string | null | undefined;
  clockInLatitude?: number | null | undefined;
  clockInLongitude?: number | null | undefined;
  clockInSelfieUrl?: string | null | undefined;
  clockInTime?: unknown;
  clockOutIP?: string | null | undefined;
  clockOutLatitude?: number | null | undefined;
  clockOutLongitude?: number | null | undefined;
  clockOutTime?: unknown;
  date: unknown;
  employeeId?: string | null | undefined;
  status?: string | null | undefined;
};

export type CreateAttendanceRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: CreateAttendanceDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type CreateEmployeeDtoInput = {
  country?: string | null | undefined;
  dateOfJoining?: unknown;
  department?: string | null | undefined;
  designation?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  managerId?: string | null | undefined;
  onboardingStatus?: string | null | undefined;
  phone?: string | null | undefined;
  reportingManagerId?: string | null | undefined;
  role?: string | null | undefined;
  status?: string | null | undefined;
};

export type CreateEmployeeRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: CreateEmployeeDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type CreateLeaveDtoInput = {
  attachmentUrl?: string | null | undefined;
  employeeId?: string | null | undefined;
  endDate: unknown;
  leaveType?: string | null | undefined;
  reason?: string | null | undefined;
  startDate: unknown;
  status?: string | null | undefined;
  totalDays: number;
};

export type CreateLeaveRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: CreateLeaveDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type CreatePayrollRequestInput = {
  requestParam?: PayrollDtoInput | null | undefined;
};

export type DeleteAttendanceDtoInput = {
  attendanceId?: string | null | undefined;
};

export type DeleteAttendanceRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: DeleteAttendanceDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type DeleteEmployeeDtoInput = {
  employeeId?: string | null | undefined;
};

export type DeleteEmployeeRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: DeleteEmployeeDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type DeleteLeaveDtoInput = {
  leaveId?: string | null | undefined;
};

export type DeleteLeaveRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: DeleteLeaveDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type DeletePayrollRequestInput = {
  requestParam?: PayrollDtoInput | null | undefined;
};

export type DocumentDtoInput = {
  category?: string | null | undefined;
  documentId?: string | null | undefined;
  expiryDate?: unknown;
  fileName?: string | null | undefined;
  fileUrl?: string | null | undefined;
  keyword?: string | null | undefined;
  rejectionReason?: string | null | undefined;
  status?: string | null | undefined;
  userId?: string | null | undefined;
};

export type ExecutionContextInput = {
  sessionId?: string | null | undefined;
  trackingId?: string | null | undefined;
  uri?: unknown;
  userId?: string | null | undefined;
};

export type ExpenseDtoInput = {
  amount: unknown;
  approvedByUserId?: string | null | undefined;
  category?: string | null | undefined;
  currency?: string | null | undefined;
  description?: string | null | undefined;
  expenseDate: unknown;
  expenseId?: string | null | undefined;
  keyword?: string | null | undefined;
  receiptUrl?: string | null | undefined;
  rejectionReason?: string | null | undefined;
  status?: string | null | undefined;
  userId?: string | null | undefined;
};

export type GetAllAnnouncementsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: AnnouncementFilterInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllAttendanceDtoInput = {
  attendanceId?: string | null | undefined;
  employeeId?: string | null | undefined;
  endDate?: unknown;
  startDate?: unknown;
  status?: string | null | undefined;
};

export type GetAllAttendanceRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: GetAllAttendanceDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllContributionsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllDocumentsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: DocumentDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllEmployeesDtoInput = {
  department?: string | null | undefined;
  employeeId?: string | null | undefined;
  keyword?: string | null | undefined;
  role?: string | null | undefined;
};

export type GetAllEmployeesRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: GetAllEmployeesDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllExpensesRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: ExpenseDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllGoalsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
  status?: string | null | undefined;
  userId?: string | null | undefined;
};

export type GetAllJobPostingsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllLeavesDtoInput = {
  employeeId?: string | null | undefined;
  leaveId?: string | null | undefined;
  leaveType?: string | null | undefined;
  status?: string | null | undefined;
};

export type GetAllLeavesRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: GetAllLeavesDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllOnboardingTasksRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllPayrollsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: PayrollDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllRecognitionsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllReportsRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type GetAllTrainingModulesRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type OrderByCriteriaInput = {
  order?: string | null | undefined;
  orderBy?: string | null | undefined;
};

export type PageCriteriaInput = {
  enablePage: boolean;
  pageSize: number;
  skip: number;
};

export type PayrollDtoInput = {
  basicSalary: unknown;
  bonus: unknown;
  countryCode?: string | null | undefined;
  currency?: string | null | undefined;
  employerESI: unknown;
  employerPF: unknown;
  esi: unknown;
  gratuity: unknown;
  grossPay: unknown;
  healthInsurance: unknown;
  hra: unknown;
  incomeTax: unknown;
  keyword?: string | null | undefined;
  lwf: unknown;
  netPay: unknown;
  otherDeductions: unknown;
  overtimePay: unknown;
  payPeriodEnd: unknown;
  payPeriodStart: unknown;
  payrollId?: string | null | undefined;
  payslipUrl?: string | null | undefined;
  pf: unknown;
  professionalTax: unknown;
  reimbursements: unknown;
  specialAllowance: unknown;
  status?: string | null | undefined;
  totalDeductions: unknown;
  userId?: string | null | undefined;
};

export type UpdateAttendanceDtoInput = {
  attendanceId?: string | null | undefined;
  clockInIP?: string | null | undefined;
  clockInLatitude?: number | null | undefined;
  clockInLongitude?: number | null | undefined;
  clockInSelfieUrl?: string | null | undefined;
  clockInTime?: unknown;
  clockOutIP?: string | null | undefined;
  clockOutLatitude?: number | null | undefined;
  clockOutLongitude?: number | null | undefined;
  clockOutTime?: unknown;
  date: unknown;
  employeeId?: string | null | undefined;
  status?: string | null | undefined;
};

export type UpdateAttendanceRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: UpdateAttendanceDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type UpdateEmployeeDtoInput = {
  country?: string | null | undefined;
  dateOfJoining?: unknown;
  department?: string | null | undefined;
  designation?: string | null | undefined;
  email?: string | null | undefined;
  employeeId?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  managerId?: string | null | undefined;
  onboardingStatus?: string | null | undefined;
  phone?: string | null | undefined;
  reportingManagerId?: string | null | undefined;
  role?: string | null | undefined;
  status?: string | null | undefined;
};

export type UpdateEmployeeRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: UpdateEmployeeDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type UpdateLeaveDtoInput = {
  attachmentUrl?: string | null | undefined;
  employeeId?: string | null | undefined;
  endDate: unknown;
  leaveId?: string | null | undefined;
  leaveType?: string | null | undefined;
  reason?: string | null | undefined;
  rejectionReason?: string | null | undefined;
  startDate: unknown;
  status?: string | null | undefined;
  totalDays: number;
};

export type UpdateLeaveRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  requestParam?: UpdateLeaveDtoInput | null | undefined;
  requestSubType?: string | null | undefined;
  requestType?: string | null | undefined;
};

export type UpdatePayrollRequestInput = {
  requestParam?: PayrollDtoInput | null | undefined;
};

export type GetAnalyticsReportsQueryVariables = Exact<{
  request: GetAllReportsRequestInput;
}>;


export type GetAnalyticsReportsQuery = { analyticsReports: { items: Array<{ id: string | null, title: string | null, category: string | null, dataJson: string | null, generatedDate: unknown }> } };

export type GetAnnouncementsQueryVariables = Exact<{
  request: GetAllAnnouncementsRequestInput;
}>;


export type GetAnnouncementsQuery = { announcements: { items: Array<{ id: string | null, title: string | null, content: string | null, category: string | null, priority: string | null, postedDate: unknown, expiryDate: unknown, views: number, likes: number }> } };

export type GetAllAttendancePageQueryVariables = Exact<{
  request: GetAllAttendanceRequestInput;
}>;


export type GetAllAttendancePageQuery = { getAllAttendance: { data: { attendanceRecords: Array<{ id: string | null, employeeId: string | null, date: unknown, clockInTime: unknown, clockOutTime: unknown, status: string | null, totalHours: number | null, overtimeHours: number | null }> | null } | null } };

export type AttPageCreateMutationVariables = Exact<{
  request: CreateAttendanceRequestInput;
}>;


export type AttPageCreateMutation = { createAttendance: { data: { attendanceId: string | null } | null } };

export type AttPageUpdateMutationVariables = Exact<{
  request: UpdateAttendanceRequestInput;
}>;


export type AttPageUpdateMutation = { updateAttendance: { data: { attendanceId: string | null } | null } };

export type AttPageDeleteMutationVariables = Exact<{
  request: DeleteAttendanceRequestInput;
}>;


export type AttPageDeleteMutation = { deleteAttendance: { data: { attendanceId: string | null } | null } };

export type GetContributionsQueryVariables = Exact<{
  request: GetAllContributionsRequestInput;
}>;


export type GetContributionsQuery = { contributions: { items: Array<{ id: string | null, userId: string | null, title: string | null, description: string | null, category: string | null, points: number, status: string | null }> } };

export type GetDashboardStatsQueryVariables = Exact<{
  employeeReq: GetAllEmployeesRequestInput;
  attendanceReq: GetAllAttendanceRequestInput;
  leaveReq: GetAllLeavesRequestInput;
  docReq: GetAllDocumentsRequestInput;
  payrollReq: GetAllPayrollsRequestInput;
  goalsReq: GetAllGoalsRequestInput;
  trainingReq: GetAllTrainingModulesRequestInput;
  annReq: GetAllAnnouncementsRequestInput;
}>;


export type GetDashboardStatsQuery = { getAllEmployees: { data: { employees: Array<{ id: string | null, firstName: string | null, lastName: string | null, email: string | null, role: string | null, status: string | null }> | null } | null }, getAllAttendance: { data: { attendanceRecords: Array<{ id: string | null, date: unknown, status: string | null }> | null } | null }, getAllLeaves: { data: { leaves: Array<{ id: string | null, leaveType: string | null, totalDays: number, status: string | null }> | null } | null }, allDocuments: { data: { documents: Array<{ status: string | null }> | null } | null }, allPayrolls: { data: { payrolls: Array<{ payPeriodEnd: unknown, netPay: unknown }> | null } | null }, goals: { items: Array<{ id: string | null, currentValue: unknown, targetValue: unknown }> }, trainingModules: { items: Array<{ id: string | null }> }, announcements: { items: Array<{ id: string | null }> } };

export type DashboardCreateLeaveMutationVariables = Exact<{
  request: CreateLeaveRequestInput;
}>;


export type DashboardCreateLeaveMutation = { createLeave: { data: { leaveId: string | null } | null } };

export type DashboardCreateEmployeeMutationVariables = Exact<{
  request: CreateEmployeeRequestInput;
}>;


export type DashboardCreateEmployeeMutation = { createEmployee: { data: { employeeId: string | null } | null } };

export type DashboardCreatePayrollMutationVariables = Exact<{
  request: CreatePayrollRequestInput;
}>;


export type DashboardCreatePayrollMutation = { createPayroll: { data: { payrollId: string | null } | null } };

export type GetAllDocumentsQueryVariables = Exact<{
  request: GetAllDocumentsRequestInput;
}>;


export type GetAllDocumentsQuery = { allDocuments: { data: { documents: Array<{ documentId: string | null, category: string | null, fileName: string | null, fileUrl: string | null, expiryDate: unknown, status: string | null, rejectionReason: string | null }> | null } | null } };

export type GetAllExpensesQueryVariables = Exact<{
  request: GetAllExpensesRequestInput;
}>;


export type GetAllExpensesQuery = { allExpenses: { data: { expenses: Array<{ expenseId: string | null, expenseDate: unknown, category: string | null, amount: unknown, currency: string | null, description: string | null, status: string | null, approvedByUserId: string | null }> | null } | null } };

export type GetAllLeavesPageQueryVariables = Exact<{
  request: GetAllLeavesRequestInput;
}>;


export type GetAllLeavesPageQuery = { getAllLeaves: { data: { leaves: Array<{ id: string | null, employeeId: string | null, leaveType: string | null, startDate: unknown, endDate: unknown, totalDays: number, reason: string | null, status: string | null }> | null } | null } };

export type LeavePageCreateMutationVariables = Exact<{
  request: CreateLeaveRequestInput;
}>;


export type LeavePageCreateMutation = { createLeave: { data: { leaveId: string | null } | null } };

export type LeavePageUpdateMutationVariables = Exact<{
  request: UpdateLeaveRequestInput;
}>;


export type LeavePageUpdateMutation = { updateLeave: { data: { leaveId: string | null } | null } };

export type LeavePageDeleteMutationVariables = Exact<{
  request: DeleteLeaveRequestInput;
}>;


export type LeavePageDeleteMutation = { deleteLeave: { data: { leaveId: string | null } | null } };

export type GetOnboardingTasksQueryVariables = Exact<{
  request: GetAllOnboardingTasksRequestInput;
}>;


export type GetOnboardingTasksQuery = { onboardingTasks: { items: Array<{ id: string | null, userId: string | null, phase: string | null, title: string | null, isCompleted: boolean }> } };

export type GetAllPayrollsPageQueryVariables = Exact<{
  request: GetAllPayrollsRequestInput;
}>;


export type GetAllPayrollsPageQuery = { allPayrolls: { data: { payrolls: Array<{ payrollId: string | null, userId: string | null, payPeriodStart: unknown, payPeriodEnd: unknown, grossPay: unknown, totalDeductions: unknown, netPay: unknown, currency: string | null, status: string | null, basicSalary: unknown }> | null } | null } };

export type PayPageCreateMutationVariables = Exact<{
  request: CreatePayrollRequestInput;
}>;


export type PayPageCreateMutation = { createPayroll: { data: { payrollId: string | null } | null } };

export type PayPageUpdateMutationVariables = Exact<{
  request: UpdatePayrollRequestInput;
}>;


export type PayPageUpdateMutation = { updatePayroll: { data: { payrollId: string | null } | null } };

export type PayPageDeleteMutationVariables = Exact<{
  request: DeletePayrollRequestInput;
}>;


export type PayPageDeleteMutation = { deletePayroll: { data: { payrollId: string | null } | null } };

export type GetGoalsQueryVariables = Exact<{
  request: GetAllGoalsRequestInput;
}>;


export type GetGoalsQuery = { goals: { items: Array<{ id: string | null, title: string | null, description: string | null, category: string | null, currentValue: unknown, targetValue: unknown, status: string | null }> } };

export type GetRecognitionsQueryVariables = Exact<{
  request: GetAllRecognitionsRequestInput;
}>;


export type GetRecognitionsQuery = { recognitions: { items: Array<{ id: string | null, giverId: string | null, receiverId: string | null, message: string | null, category: string | null, createdOn: unknown }> } };

export type GetJobPostingsQueryVariables = Exact<{
  request: GetAllJobPostingsRequestInput;
}>;


export type GetJobPostingsQuery = { jobPostings: { items: Array<{ id: string | null, title: string | null, description: string | null, department: string | null, location: string | null, status: string | null }> } };

export type GetAllEmployeesPageQueryVariables = Exact<{
  request: GetAllEmployeesRequestInput;
}>;


export type GetAllEmployeesPageQuery = { getAllEmployees: { data: { employees: Array<{ id: string | null, firstName: string | null, lastName: string | null, email: string | null, phone: string | null, designation: string | null, department: string | null, role: string | null, status: string | null, country: string | null }> | null } | null } };

export type EmpPageCreateMutationVariables = Exact<{
  request: CreateEmployeeRequestInput;
}>;


export type EmpPageCreateMutation = { createEmployee: { data: { employeeId: string | null } | null } };

export type EmpPageUpdateMutationVariables = Exact<{
  request: UpdateEmployeeRequestInput;
}>;


export type EmpPageUpdateMutation = { updateEmployee: { data: { employeeId: string | null } | null } };

export type EmpPageDeleteMutationVariables = Exact<{
  request: DeleteEmployeeRequestInput;
}>;


export type EmpPageDeleteMutation = { deleteEmployee: { data: { employeeId: string | null } | null } };

export type GetTrainingModulesQueryVariables = Exact<{
  request: GetAllTrainingModulesRequestInput;
}>;


export type GetTrainingModulesQuery = { trainingModules: { items: Array<{ id: string | null, title: string | null, description: string | null, category: string | null, contentUrl: string | null, isMandatory: boolean }> } };

export type TopbarCreateAttendanceMutationVariables = Exact<{
  request: CreateAttendanceRequestInput;
}>;


export type TopbarCreateAttendanceMutation = { createAttendance: { data: { attendanceId: string | null } | null } };


export const GetAnalyticsReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnalyticsReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllReportsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analyticsReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"dataJson"}},{"kind":"Field","name":{"kind":"Name","value":"generatedDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnalyticsReportsQuery, GetAnalyticsReportsQueryVariables>;
export const GetAnnouncementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnnouncements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAnnouncementsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"postedDate"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>;
export const GetAllAttendancePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAttendancePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"clockInTime"}},{"kind":"Field","name":{"kind":"Name","value":"clockOutTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalHours"}},{"kind":"Field","name":{"kind":"Name","value":"overtimeHours"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAttendancePageQuery, GetAllAttendancePageQueryVariables>;
export const AttPageCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttPageCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceId"}}]}}]}}]}}]} as unknown as DocumentNode<AttPageCreateMutation, AttPageCreateMutationVariables>;
export const AttPageUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttPageUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceId"}}]}}]}}]}}]} as unknown as DocumentNode<AttPageUpdateMutation, AttPageUpdateMutationVariables>;
export const AttPageDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttPageDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceId"}}]}}]}}]}}]} as unknown as DocumentNode<AttPageDeleteMutation, AttPageDeleteMutationVariables>;
export const GetContributionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContributions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllContributionsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetContributionsQuery, GetContributionsQueryVariables>;
export const GetDashboardStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllEmployeesRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attendanceReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAttendanceRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaveReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllLeavesRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"docReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllDocumentsRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payrollReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllPayrollsRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"goalsReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllGoalsRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllTrainingModulesRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"annReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAnnouncementsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllEmployees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAllAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attendanceReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAllLeaves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaveReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaveType"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"allDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"docReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"allPayrolls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payrollReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payPeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"goalsReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"trainingModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"annReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const DashboardCreateLeaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DashboardCreateLeave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLeaveRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLeave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveId"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardCreateLeaveMutation, DashboardCreateLeaveMutationVariables>;
export const DashboardCreateEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DashboardCreateEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEmployeeRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardCreateEmployeeMutation, DashboardCreateEmployeeMutationVariables>;
export const DashboardCreatePayrollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DashboardCreatePayroll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePayrollRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPayroll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardCreatePayrollMutation, DashboardCreatePayrollMutationVariables>;
export const GetAllDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllDocumentsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>;
export const GetAllExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllExpensesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allExpenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseId"}},{"kind":"Field","name":{"kind":"Name","value":"expenseDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"approvedByUserId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllExpensesQuery, GetAllExpensesQueryVariables>;
export const GetAllLeavesPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllLeavesPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllLeavesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllLeaves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"leaveType"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllLeavesPageQuery, GetAllLeavesPageQueryVariables>;
export const LeavePageCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeavePageCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLeaveRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLeave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveId"}}]}}]}}]}}]} as unknown as DocumentNode<LeavePageCreateMutation, LeavePageCreateMutationVariables>;
export const LeavePageUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeavePageUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLeaveRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveId"}}]}}]}}]}}]} as unknown as DocumentNode<LeavePageUpdateMutation, LeavePageUpdateMutationVariables>;
export const LeavePageDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeavePageDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteLeaveRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLeave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveId"}}]}}]}}]}}]} as unknown as DocumentNode<LeavePageDeleteMutation, LeavePageDeleteMutationVariables>;
export const GetOnboardingTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOnboardingTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllOnboardingTasksRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onboardingTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]}}]} as unknown as DocumentNode<GetOnboardingTasksQuery, GetOnboardingTasksQueryVariables>;
export const GetAllPayrollsPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPayrollsPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllPayrollsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPayrolls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"payPeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"payPeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"grossPay"}},{"kind":"Field","name":{"kind":"Name","value":"totalDeductions"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"basicSalary"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPayrollsPageQuery, GetAllPayrollsPageQueryVariables>;
export const PayPageCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayPageCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePayrollRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPayroll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}}]}}]}}]}}]} as unknown as DocumentNode<PayPageCreateMutation, PayPageCreateMutationVariables>;
export const PayPageUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayPageUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePayrollRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePayroll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}}]}}]}}]}}]} as unknown as DocumentNode<PayPageUpdateMutation, PayPageUpdateMutationVariables>;
export const PayPageDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayPageDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePayrollRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePayroll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}}]}}]}}]}}]} as unknown as DocumentNode<PayPageDeleteMutation, PayPageDeleteMutationVariables>;
export const GetGoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGoals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllGoalsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetGoalsQuery, GetGoalsQueryVariables>;
export const GetRecognitionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecognitions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllRecognitionsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recognitions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"giverId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdOn"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecognitionsQuery, GetRecognitionsQueryVariables>;
export const GetJobPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobPostings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllJobPostingsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobPostings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetJobPostingsQuery, GetJobPostingsQueryVariables>;
export const GetAllEmployeesPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllEmployeesPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllEmployeesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllEmployees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllEmployeesPageQuery, GetAllEmployeesPageQueryVariables>;
export const EmpPageCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmpPageCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEmployeeRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"}}]}}]}}]}}]} as unknown as DocumentNode<EmpPageCreateMutation, EmpPageCreateMutationVariables>;
export const EmpPageUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmpPageUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEmployeeRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"}}]}}]}}]}}]} as unknown as DocumentNode<EmpPageUpdateMutation, EmpPageUpdateMutationVariables>;
export const EmpPageDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmpPageDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteEmployeeRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"}}]}}]}}]}}]} as unknown as DocumentNode<EmpPageDeleteMutation, EmpPageDeleteMutationVariables>;
export const GetTrainingModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrainingModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllTrainingModulesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trainingModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"contentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMandatory"}}]}}]}}]}}]} as unknown as DocumentNode<GetTrainingModulesQuery, GetTrainingModulesQueryVariables>;
export const TopbarCreateAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TopbarCreateAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceId"}}]}}]}}]}}]} as unknown as DocumentNode<TopbarCreateAttendanceMutation, TopbarCreateAttendanceMutationVariables>;