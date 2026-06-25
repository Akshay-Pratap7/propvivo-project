/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ExecutionContextInput = {
  sessionId?: string | null | undefined;
  trackingId?: string | null | undefined;
  uri?: unknown;
  userId?: string | null | undefined;
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

export type OrderByCriteriaInput = {
  order?: string | null | undefined;
  orderBy?: string | null | undefined;
};

export type PageCriteriaInput = {
  enablePage: boolean;
  pageSize: number;
  skip: number;
};

export type GetAllAttendanceQueryVariables = Exact<{
  request: GetAllAttendanceRequestInput;
}>;


export type GetAllAttendanceQuery = { getAllAttendance: { data: { attendanceRecords: Array<{ id: string | null, employeeId: string | null, date: unknown, clockInTime: unknown, clockOutTime: unknown, status: string | null, totalHours: number | null, overtimeHours: number | null }> | null } | null } };

export type GetAllLeavesQueryVariables = Exact<{
  request: GetAllLeavesRequestInput;
}>;


export type GetAllLeavesQuery = { getAllLeaves: { data: { leaves: Array<{ id: string | null, employeeId: string | null, leaveType: string | null, startDate: unknown, endDate: unknown, totalDays: number, status: string | null, reason: string | null }> | null } | null } };


export const GetAllAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllAttendanceRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"clockInTime"}},{"kind":"Field","name":{"kind":"Name","value":"clockOutTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalHours"}},{"kind":"Field","name":{"kind":"Name","value":"overtimeHours"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAttendanceQuery, GetAllAttendanceQueryVariables>;
export const GetAllLeavesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllLeaves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetAllLeavesRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllLeaves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"leaveType"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllLeavesQuery, GetAllLeavesQueryVariables>;