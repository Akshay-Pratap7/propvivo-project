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

export type CreateDocumentRequestInput = {
  requestParam?: DocumentDtoInput | null | undefined;
};

export type CreateExpenseRequestInput = {
  requestParam?: ExpenseDtoInput | null | undefined;
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

export type GetAllTeamMembersRequestInput = {
  executionContext?: ExecutionContextInput | null | undefined;
  orderByCriteria?: OrderByCriteriaInput | null | undefined;
  pageCriteria?: PageCriteriaInput | null | undefined;
  requestParam?: TeamMemberDtoInput | null | undefined;
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

export type TeamMemberDtoInput = {
  address?: string | null | undefined;
  dateOfJoining: unknown;
  department?: string | null | undefined;
  designation?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  keyword?: string | null | undefined;
  lastName?: string | null | undefined;
  memberId?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  status?: string | null | undefined;
  userId?: string | null | undefined;
};

export type GetAnalyticsReportsQueryVariables = Exact<{
  request: GetAllReportsRequestInput;
}>;


export type GetAnalyticsReportsQuery = { analyticsReports: { items: Array<{ id: string | null, title: string | null, category: string | null, dataJson: string | null, generatedDate: unknown }> } };

export type GetAnnouncementsQueryVariables = Exact<{
  request: GetAllAnnouncementsRequestInput;
}>;


export type GetAnnouncementsQuery = { announcements: { items: Array<{ id: string | null, title: string | null, content: string | null, category: string | null, priority: string | null, postedDate: unknown, expiryDate: unknown, views: number, likes: number }> } };

export type GetAllAttendanceQueryVariables = Exact<{
  request: GetAllAttendanceRequestInput;
}>;


export type GetAllAttendanceQuery = { getAllAttendance: { data: { attendanceRecords: Array<{ id: string | null, employeeId: string | null, date: unknown, clockInTime: unknown, clockOutTime: unknown, status: string | null, totalHours: number | null, overtimeHours: number | null }> | null } | null } };

export type GetContributionsQueryVariables = Exact<{
  request: GetAllContributionsRequestInput;
}>;


export type GetContributionsQuery = { contributions: { items: Array<{ id: string | null, userId: string | null, title: string | null, description: string | null, category: string | null, points: number, status: string | null }> } };

export type GetDashboardStatsQueryVariables = Exact<{
  attendanceReq: GetAllAttendanceRequestInput;
  leaveReq: GetAllLeavesRequestInput;
  docReq: GetAllDocumentsRequestInput;
  payrollReq: GetAllPayrollsRequestInput;
  goalsReq: GetAllGoalsRequestInput;
  trainingReq: GetAllTrainingModulesRequestInput;
  annReq: GetAllAnnouncementsRequestInput;
}>;


export type GetDashboardStatsQuery = { getAllAttendance: { data: { attendanceRecords: Array<{ status: string | null }> | null } | null }, getAllLeaves: { data: { leaves: Array<{ totalDays: number, status: string | null }> | null } | null }, allDocuments: { data: { documents: Array<{ status: string | null }> | null } | null }, allPayrolls: { data: { payrolls: Array<{ payPeriodEnd: unknown, netPay: unknown }> | null } | null }, goals: { items: Array<{ currentValue: unknown, targetValue: unknown }> }, trainingModules: { items: Array<{ id: string | null }> }, announcements: { items: Array<{ id: string | null }> } };

export type CreateAttendanceMutationVariables = Exact<{
  request: CreateAttendanceRequestInput;
}>;


export type CreateAttendanceMutation = { createAttendance: { data: { attendanceId: string | null } | null } };

export type CreateLeaveMutationVariables = Exact<{
  request: CreateLeaveRequestInput;
}>;


export type CreateLeaveMutation = { createLeave: { data: { leaveId: string | null } | null } };

export type CreateDocumentMutationVariables = Exact<{
  request: CreateDocumentRequestInput;
}>;


export type CreateDocumentMutation = { createDocument: { data: { documentId: string | null } | null } };

export type CreateExpenseMutationVariables = Exact<{
  request: CreateExpenseRequestInput;
}>;


export type CreateExpenseMutation = { createExpense: { data: { expenseId: string | null } | null } };

export type GetAllDocumentsQueryVariables = Exact<{
  request: GetAllDocumentsRequestInput;
}>;


export type GetAllDocumentsQuery = { allDocuments: { data: { documents: Array<{ documentId: string | null, category: string | null, fileName: string | null, fileUrl: string | null, expiryDate: unknown, status: string | null, rejectionReason: string | null }> | null } | null } };

export type GetAllExpensesQueryVariables = Exact<{
  request: GetAllExpensesRequestInput;
}>;


export type GetAllExpensesQuery = { allExpenses: { data: { expenses: Array<{ expenseId: string | null, expenseDate: unknown, category: string | null, amount: unknown, currency: string | null, description: string | null, status: string | null, approvedByUserId: string | null }> | null } | null } };

export type GetAllLeavesQueryVariables = Exact<{
  request: GetAllLeavesRequestInput;
}>;


export type GetAllLeavesQuery = { getAllLeaves: { data: { leaves: Array<{ id: string | null, employeeId: string | null, leaveType: string | null, startDate: unknown, endDate: unknown, totalDays: number, status: string | null, reason: string | null }> | null } | null } };

export type GetOnboardingTasksQueryVariables = Exact<{
  request: GetAllOnboardingTasksRequestInput;
}>;


export type GetOnboardingTasksQuery = { onboardingTasks: { items: Array<{ id: string | null, userId: string | null, phase: string | null, title: string | null, isCompleted: boolean }> } };

export type GetAllPayrollsQueryVariables = Exact<{
  request: GetAllPayrollsRequestInput;
}>;


export type GetAllPayrollsQuery = { allPayrolls: { data: { payrolls: Array<{ payrollId: string | null, payPeriodStart: unknown, payPeriodEnd: unknown, grossPay: unknown, totalDeductions: unknown, netPay: unknown, countryCode: string | null, status: string | null }> | null } | null } };

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

export type GetAllTeamMembersQueryVariables = Exact<{
  request: GetAllTeamMembersRequestInput;
}>;


export type GetAllTeamMembersQuery = { allTeamMembers: { data: { teamMembers: Array<{ memberId: string | null, firstName: string | null, lastName: string | null, email: string | null, designation: string | null, department: string | null, dateOfJoining: unknown, status: string | null }> | null } | null } };

export type GetTrainingModulesQueryVariables = Exact<{
  request: GetAllTrainingModulesRequestInput;
}>;


export type GetTrainingModulesQuery = { trainingModules: { items: Array<{ id: string | null, title: string | null, description: string | null, category: string | null, contentUrl: string | null, isMandatory: boolean }> } };


export const GetAnalyticsReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnalyticsReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllReportsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analyticsReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"dataJson"}},{"kind":"Field","name":{"kind":"Name","value":"generatedDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnalyticsReportsQuery, GetAnalyticsReportsQueryVariables>;
export const GetAnnouncementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnnouncements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAnnouncementsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"postedDate"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>;
export const GetAllAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"clockInTime"}},{"kind":"Field","name":{"kind":"Name","value":"clockOutTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalHours"}},{"kind":"Field","name":{"kind":"Name","value":"overtimeHours"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAttendanceQuery, GetAllAttendanceQueryVariables>;
export const GetContributionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContributions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllContributionsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetContributionsQuery, GetContributionsQueryVariables>;
export const GetDashboardStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attendanceReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAttendanceRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaveReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllLeavesRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"docReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllDocumentsRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payrollReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllPayrollsRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"goalsReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllGoalsRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllTrainingModulesRequestInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"annReq"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAnnouncementsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attendanceReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAllLeaves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaveReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"allDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"docReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"allPayrolls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payrollReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payPeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"goalsReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"trainingModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"annReq"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const CreateAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAttendanceMutation, CreateAttendanceMutationVariables>;
export const CreateLeaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLeave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLeaveRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLeave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLeaveMutation, CreateLeaveMutationVariables>;
export const CreateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDocumentRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const CreateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpenseRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const GetAllDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllDocumentsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>;
export const GetAllExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllExpensesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allExpenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseId"}},{"kind":"Field","name":{"kind":"Name","value":"expenseDate"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"approvedByUserId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllExpensesQuery, GetAllExpensesQueryVariables>;
export const GetAllLeavesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllLeaves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllLeavesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllLeaves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"leaveType"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllLeavesQuery, GetAllLeavesQueryVariables>;
export const GetOnboardingTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOnboardingTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllOnboardingTasksRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onboardingTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]}}]} as unknown as DocumentNode<GetOnboardingTasksQuery, GetOnboardingTasksQueryVariables>;
export const GetAllPayrollsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPayrolls"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllPayrollsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPayrolls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}},{"kind":"Field","name":{"kind":"Name","value":"payPeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"payPeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"grossPay"}},{"kind":"Field","name":{"kind":"Name","value":"totalDeductions"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPayrollsQuery, GetAllPayrollsQueryVariables>;
export const GetGoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGoals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllGoalsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"currentValue"}},{"kind":"Field","name":{"kind":"Name","value":"targetValue"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetGoalsQuery, GetGoalsQueryVariables>;
export const GetRecognitionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecognitions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllRecognitionsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recognitions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"giverId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdOn"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecognitionsQuery, GetRecognitionsQueryVariables>;
export const GetJobPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobPostings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllJobPostingsRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobPostings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetJobPostingsQuery, GetJobPostingsQueryVariables>;
export const GetAllTeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTeamMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllTeamMembersRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTeamMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfJoining"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTeamMembersQuery, GetAllTeamMembersQueryVariables>;
export const GetTrainingModulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrainingModules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllTrainingModulesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trainingModules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"contentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMandatory"}}]}}]}}]}}]} as unknown as DocumentNode<GetTrainingModulesQuery, GetTrainingModulesQueryVariables>;