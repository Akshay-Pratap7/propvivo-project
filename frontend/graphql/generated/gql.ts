/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetAnalyticsReports($request: GetAllReportsRequestInput!) {\n    analyticsReports(request: $request) {\n      items {\n        id\n        title\n        category\n        dataJson\n        generatedDate\n      }\n    }\n  }\n": typeof types.GetAnalyticsReportsDocument,
    "\n  query GetAnnouncements($request: GetAllAnnouncementsRequestInput!) {\n    announcements(request: $request) {\n      items {\n        id\n        title\n        content\n        category\n        priority\n        postedDate\n        expiryDate\n        views\n        likes\n      }\n    }\n  }\n": typeof types.GetAnnouncementsDocument,
    "\n  query GetAllAttendancePage($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n": typeof types.GetAllAttendancePageDocument,
    "\n  mutation AttPageCreate($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n": typeof types.AttPageCreateDocument,
    "\n  mutation AttPageUpdate($request: UpdateAttendanceRequestInput!) {\n    updateAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n": typeof types.AttPageUpdateDocument,
    "\n  mutation AttPageDelete($request: DeleteAttendanceRequestInput!) {\n    deleteAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n": typeof types.AttPageDeleteDocument,
    "\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n": typeof types.GetContributionsDocument,
    "\n  query GetDashboardStats(\n    $employeeReq: GetAllEmployeesRequestInput!\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllEmployees(request: $employeeReq) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          role\n          status\n        }\n      }\n    }\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          id\n          date\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          id\n          leaveType\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        id\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n": typeof types.GetDashboardStatsDocument,
    "\n  mutation DashboardCreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n": typeof types.DashboardCreateLeaveDocument,
    "\n  mutation DashboardCreateEmployee($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) {\n      data {\n        employeeId\n      }\n    }\n  }\n": typeof types.DashboardCreateEmployeeDocument,
    "\n  mutation DashboardCreatePayroll($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) {\n      data {\n        payrollId\n      }\n    }\n  }\n": typeof types.DashboardCreatePayrollDocument,
    "\n  query GetAllDocuments($request: GetAllDocumentsRequestInput!) {\n    allDocuments(request: $request) {\n      data {\n        documents {\n          documentId\n          category\n          fileName\n          fileUrl\n          expiryDate\n          status\n          rejectionReason\n        }\n      }\n    }\n  }\n": typeof types.GetAllDocumentsDocument,
    "\n  query GetAllExpenses($request: GetAllExpensesRequestInput!) {\n    allExpenses(request: $request) {\n      data {\n        expenses {\n          expenseId\n          expenseDate\n          category\n          amount\n          currency\n          description\n          status\n          approvedByUserId\n        }\n      }\n    }\n  }\n": typeof types.GetAllExpensesDocument,
    "\n  query GetAllLeavesPage($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          reason\n          status\n        }\n      }\n    }\n  }\n": typeof types.GetAllLeavesPageDocument,
    "\n  mutation LeavePageCreate($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) { data { leaveId } }\n  }\n": typeof types.LeavePageCreateDocument,
    "\n  mutation LeavePageUpdate($request: UpdateLeaveRequestInput!) {\n    updateLeave(request: $request) { data { leaveId } }\n  }\n": typeof types.LeavePageUpdateDocument,
    "\n  mutation LeavePageDelete($request: DeleteLeaveRequestInput!) {\n    deleteLeave(request: $request) { data { leaveId } }\n  }\n": typeof types.LeavePageDeleteDocument,
    "\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n": typeof types.GetOnboardingTasksDocument,
    "\n  query GetAllPayrollsPage($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          userId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          currency\n          status\n          basicSalary\n        }\n      }\n    }\n  }\n": typeof types.GetAllPayrollsPageDocument,
    "\n  mutation PayPageCreate($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) { data { payrollId } }\n  }\n": typeof types.PayPageCreateDocument,
    "\n  mutation PayPageUpdate($request: UpdatePayrollRequestInput!) {\n    updatePayroll(request: $request) { data { payrollId } }\n  }\n": typeof types.PayPageUpdateDocument,
    "\n  mutation PayPageDelete($request: DeletePayrollRequestInput!) {\n    deletePayroll(request: $request) { data { payrollId } }\n  }\n": typeof types.PayPageDeleteDocument,
    "\n  query GetGoals($request: GetAllGoalsRequestInput!) {\n    goals(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        currentValue\n        targetValue\n        status\n      }\n    }\n  }\n": typeof types.GetGoalsDocument,
    "\n  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {\n    recognitions(request: $request) {\n      items {\n        id\n        giverId\n        receiverId\n        message\n        category\n        createdOn\n      }\n    }\n  }\n": typeof types.GetRecognitionsDocument,
    "\n  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {\n    jobPostings(request: $request) {\n      items {\n        id\n        title\n        description\n        department\n        location\n        status\n      }\n    }\n  }\n": typeof types.GetJobPostingsDocument,
    "\n  query GetAllEmployeesPage($request: GetAllEmployeesRequestInput!) {\n    getAllEmployees(request: $request) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          phone\n          designation\n          department\n          role\n          status\n          country\n        }\n      }\n    }\n  }\n": typeof types.GetAllEmployeesPageDocument,
    "\n  mutation EmpPageCreate($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) { data { employeeId } }\n  }\n": typeof types.EmpPageCreateDocument,
    "\n  mutation EmpPageUpdate($request: UpdateEmployeeRequestInput!) {\n    updateEmployee(request: $request) { data { employeeId } }\n  }\n": typeof types.EmpPageUpdateDocument,
    "\n  mutation EmpPageDelete($request: DeleteEmployeeRequestInput!) {\n    deleteEmployee(request: $request) { data { employeeId } }\n  }\n": typeof types.EmpPageDeleteDocument,
    "\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n": typeof types.GetTrainingModulesDocument,
    "\n  mutation TopbarCreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n": typeof types.TopbarCreateAttendanceDocument,
};
const documents: Documents = {
    "\n  query GetAnalyticsReports($request: GetAllReportsRequestInput!) {\n    analyticsReports(request: $request) {\n      items {\n        id\n        title\n        category\n        dataJson\n        generatedDate\n      }\n    }\n  }\n": types.GetAnalyticsReportsDocument,
    "\n  query GetAnnouncements($request: GetAllAnnouncementsRequestInput!) {\n    announcements(request: $request) {\n      items {\n        id\n        title\n        content\n        category\n        priority\n        postedDate\n        expiryDate\n        views\n        likes\n      }\n    }\n  }\n": types.GetAnnouncementsDocument,
    "\n  query GetAllAttendancePage($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n": types.GetAllAttendancePageDocument,
    "\n  mutation AttPageCreate($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n": types.AttPageCreateDocument,
    "\n  mutation AttPageUpdate($request: UpdateAttendanceRequestInput!) {\n    updateAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n": types.AttPageUpdateDocument,
    "\n  mutation AttPageDelete($request: DeleteAttendanceRequestInput!) {\n    deleteAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n": types.AttPageDeleteDocument,
    "\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n": types.GetContributionsDocument,
    "\n  query GetDashboardStats(\n    $employeeReq: GetAllEmployeesRequestInput!\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllEmployees(request: $employeeReq) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          role\n          status\n        }\n      }\n    }\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          id\n          date\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          id\n          leaveType\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        id\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n": types.GetDashboardStatsDocument,
    "\n  mutation DashboardCreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n": types.DashboardCreateLeaveDocument,
    "\n  mutation DashboardCreateEmployee($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) {\n      data {\n        employeeId\n      }\n    }\n  }\n": types.DashboardCreateEmployeeDocument,
    "\n  mutation DashboardCreatePayroll($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) {\n      data {\n        payrollId\n      }\n    }\n  }\n": types.DashboardCreatePayrollDocument,
    "\n  query GetAllDocuments($request: GetAllDocumentsRequestInput!) {\n    allDocuments(request: $request) {\n      data {\n        documents {\n          documentId\n          category\n          fileName\n          fileUrl\n          expiryDate\n          status\n          rejectionReason\n        }\n      }\n    }\n  }\n": types.GetAllDocumentsDocument,
    "\n  query GetAllExpenses($request: GetAllExpensesRequestInput!) {\n    allExpenses(request: $request) {\n      data {\n        expenses {\n          expenseId\n          expenseDate\n          category\n          amount\n          currency\n          description\n          status\n          approvedByUserId\n        }\n      }\n    }\n  }\n": types.GetAllExpensesDocument,
    "\n  query GetAllLeavesPage($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          reason\n          status\n        }\n      }\n    }\n  }\n": types.GetAllLeavesPageDocument,
    "\n  mutation LeavePageCreate($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) { data { leaveId } }\n  }\n": types.LeavePageCreateDocument,
    "\n  mutation LeavePageUpdate($request: UpdateLeaveRequestInput!) {\n    updateLeave(request: $request) { data { leaveId } }\n  }\n": types.LeavePageUpdateDocument,
    "\n  mutation LeavePageDelete($request: DeleteLeaveRequestInput!) {\n    deleteLeave(request: $request) { data { leaveId } }\n  }\n": types.LeavePageDeleteDocument,
    "\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n": types.GetOnboardingTasksDocument,
    "\n  query GetAllPayrollsPage($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          userId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          currency\n          status\n          basicSalary\n        }\n      }\n    }\n  }\n": types.GetAllPayrollsPageDocument,
    "\n  mutation PayPageCreate($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) { data { payrollId } }\n  }\n": types.PayPageCreateDocument,
    "\n  mutation PayPageUpdate($request: UpdatePayrollRequestInput!) {\n    updatePayroll(request: $request) { data { payrollId } }\n  }\n": types.PayPageUpdateDocument,
    "\n  mutation PayPageDelete($request: DeletePayrollRequestInput!) {\n    deletePayroll(request: $request) { data { payrollId } }\n  }\n": types.PayPageDeleteDocument,
    "\n  query GetGoals($request: GetAllGoalsRequestInput!) {\n    goals(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        currentValue\n        targetValue\n        status\n      }\n    }\n  }\n": types.GetGoalsDocument,
    "\n  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {\n    recognitions(request: $request) {\n      items {\n        id\n        giverId\n        receiverId\n        message\n        category\n        createdOn\n      }\n    }\n  }\n": types.GetRecognitionsDocument,
    "\n  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {\n    jobPostings(request: $request) {\n      items {\n        id\n        title\n        description\n        department\n        location\n        status\n      }\n    }\n  }\n": types.GetJobPostingsDocument,
    "\n  query GetAllEmployeesPage($request: GetAllEmployeesRequestInput!) {\n    getAllEmployees(request: $request) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          phone\n          designation\n          department\n          role\n          status\n          country\n        }\n      }\n    }\n  }\n": types.GetAllEmployeesPageDocument,
    "\n  mutation EmpPageCreate($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) { data { employeeId } }\n  }\n": types.EmpPageCreateDocument,
    "\n  mutation EmpPageUpdate($request: UpdateEmployeeRequestInput!) {\n    updateEmployee(request: $request) { data { employeeId } }\n  }\n": types.EmpPageUpdateDocument,
    "\n  mutation EmpPageDelete($request: DeleteEmployeeRequestInput!) {\n    deleteEmployee(request: $request) { data { employeeId } }\n  }\n": types.EmpPageDeleteDocument,
    "\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n": types.GetTrainingModulesDocument,
    "\n  mutation TopbarCreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n": types.TopbarCreateAttendanceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnalyticsReports($request: GetAllReportsRequestInput!) {\n    analyticsReports(request: $request) {\n      items {\n        id\n        title\n        category\n        dataJson\n        generatedDate\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAnalyticsReports($request: GetAllReportsRequestInput!) {\n    analyticsReports(request: $request) {\n      items {\n        id\n        title\n        category\n        dataJson\n        generatedDate\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnnouncements($request: GetAllAnnouncementsRequestInput!) {\n    announcements(request: $request) {\n      items {\n        id\n        title\n        content\n        category\n        priority\n        postedDate\n        expiryDate\n        views\n        likes\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAnnouncements($request: GetAllAnnouncementsRequestInput!) {\n    announcements(request: $request) {\n      items {\n        id\n        title\n        content\n        category\n        priority\n        postedDate\n        expiryDate\n        views\n        likes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllAttendancePage($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllAttendancePage($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AttPageCreate($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n"): (typeof documents)["\n  mutation AttPageCreate($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AttPageUpdate($request: UpdateAttendanceRequestInput!) {\n    updateAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n"): (typeof documents)["\n  mutation AttPageUpdate($request: UpdateAttendanceRequestInput!) {\n    updateAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AttPageDelete($request: DeleteAttendanceRequestInput!) {\n    deleteAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n"): (typeof documents)["\n  mutation AttPageDelete($request: DeleteAttendanceRequestInput!) {\n    deleteAttendance(request: $request) {\n      data { attendanceId }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDashboardStats(\n    $employeeReq: GetAllEmployeesRequestInput!\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllEmployees(request: $employeeReq) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          role\n          status\n        }\n      }\n    }\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          id\n          date\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          id\n          leaveType\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        id\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDashboardStats(\n    $employeeReq: GetAllEmployeesRequestInput!\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllEmployees(request: $employeeReq) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          role\n          status\n        }\n      }\n    }\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          id\n          date\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          id\n          leaveType\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        id\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DashboardCreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DashboardCreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DashboardCreateEmployee($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) {\n      data {\n        employeeId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DashboardCreateEmployee($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) {\n      data {\n        employeeId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DashboardCreatePayroll($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) {\n      data {\n        payrollId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DashboardCreatePayroll($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) {\n      data {\n        payrollId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllDocuments($request: GetAllDocumentsRequestInput!) {\n    allDocuments(request: $request) {\n      data {\n        documents {\n          documentId\n          category\n          fileName\n          fileUrl\n          expiryDate\n          status\n          rejectionReason\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllDocuments($request: GetAllDocumentsRequestInput!) {\n    allDocuments(request: $request) {\n      data {\n        documents {\n          documentId\n          category\n          fileName\n          fileUrl\n          expiryDate\n          status\n          rejectionReason\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllExpenses($request: GetAllExpensesRequestInput!) {\n    allExpenses(request: $request) {\n      data {\n        expenses {\n          expenseId\n          expenseDate\n          category\n          amount\n          currency\n          description\n          status\n          approvedByUserId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllExpenses($request: GetAllExpensesRequestInput!) {\n    allExpenses(request: $request) {\n      data {\n        expenses {\n          expenseId\n          expenseDate\n          category\n          amount\n          currency\n          description\n          status\n          approvedByUserId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllLeavesPage($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          reason\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllLeavesPage($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          reason\n          status\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeavePageCreate($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) { data { leaveId } }\n  }\n"): (typeof documents)["\n  mutation LeavePageCreate($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) { data { leaveId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeavePageUpdate($request: UpdateLeaveRequestInput!) {\n    updateLeave(request: $request) { data { leaveId } }\n  }\n"): (typeof documents)["\n  mutation LeavePageUpdate($request: UpdateLeaveRequestInput!) {\n    updateLeave(request: $request) { data { leaveId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeavePageDelete($request: DeleteLeaveRequestInput!) {\n    deleteLeave(request: $request) { data { leaveId } }\n  }\n"): (typeof documents)["\n  mutation LeavePageDelete($request: DeleteLeaveRequestInput!) {\n    deleteLeave(request: $request) { data { leaveId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllPayrollsPage($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          userId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          currency\n          status\n          basicSalary\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPayrollsPage($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          userId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          currency\n          status\n          basicSalary\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PayPageCreate($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) { data { payrollId } }\n  }\n"): (typeof documents)["\n  mutation PayPageCreate($request: CreatePayrollRequestInput!) {\n    createPayroll(request: $request) { data { payrollId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PayPageUpdate($request: UpdatePayrollRequestInput!) {\n    updatePayroll(request: $request) { data { payrollId } }\n  }\n"): (typeof documents)["\n  mutation PayPageUpdate($request: UpdatePayrollRequestInput!) {\n    updatePayroll(request: $request) { data { payrollId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PayPageDelete($request: DeletePayrollRequestInput!) {\n    deletePayroll(request: $request) { data { payrollId } }\n  }\n"): (typeof documents)["\n  mutation PayPageDelete($request: DeletePayrollRequestInput!) {\n    deletePayroll(request: $request) { data { payrollId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGoals($request: GetAllGoalsRequestInput!) {\n    goals(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        currentValue\n        targetValue\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGoals($request: GetAllGoalsRequestInput!) {\n    goals(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        currentValue\n        targetValue\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {\n    recognitions(request: $request) {\n      items {\n        id\n        giverId\n        receiverId\n        message\n        category\n        createdOn\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {\n    recognitions(request: $request) {\n      items {\n        id\n        giverId\n        receiverId\n        message\n        category\n        createdOn\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {\n    jobPostings(request: $request) {\n      items {\n        id\n        title\n        description\n        department\n        location\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {\n    jobPostings(request: $request) {\n      items {\n        id\n        title\n        description\n        department\n        location\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllEmployeesPage($request: GetAllEmployeesRequestInput!) {\n    getAllEmployees(request: $request) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          phone\n          designation\n          department\n          role\n          status\n          country\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllEmployeesPage($request: GetAllEmployeesRequestInput!) {\n    getAllEmployees(request: $request) {\n      data {\n        employees {\n          id\n          firstName\n          lastName\n          email\n          phone\n          designation\n          department\n          role\n          status\n          country\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EmpPageCreate($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) { data { employeeId } }\n  }\n"): (typeof documents)["\n  mutation EmpPageCreate($request: CreateEmployeeRequestInput!) {\n    createEmployee(request: $request) { data { employeeId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EmpPageUpdate($request: UpdateEmployeeRequestInput!) {\n    updateEmployee(request: $request) { data { employeeId } }\n  }\n"): (typeof documents)["\n  mutation EmpPageUpdate($request: UpdateEmployeeRequestInput!) {\n    updateEmployee(request: $request) { data { employeeId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EmpPageDelete($request: DeleteEmployeeRequestInput!) {\n    deleteEmployee(request: $request) { data { employeeId } }\n  }\n"): (typeof documents)["\n  mutation EmpPageDelete($request: DeleteEmployeeRequestInput!) {\n    deleteEmployee(request: $request) { data { employeeId } }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TopbarCreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation TopbarCreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;