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
    "\n  query GetAllAttendance($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n": typeof types.GetAllAttendanceDocument,
    "\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n": typeof types.GetContributionsDocument,
    "\n  query GetDashboardStats(\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n": typeof types.GetDashboardStatsDocument,
    "\n  mutation CreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n": typeof types.CreateAttendanceDocument,
    "\n  mutation CreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n": typeof types.CreateLeaveDocument,
    "\n  mutation CreateDocument($request: CreateDocumentRequestInput!) {\n    createDocument(request: $request) {\n      data {\n        documentId\n      }\n    }\n  }\n": typeof types.CreateDocumentDocument,
    "\n  mutation CreateExpense($request: CreateExpenseRequestInput!) {\n    createExpense(request: $request) {\n      data {\n        expenseId\n      }\n    }\n  }\n": typeof types.CreateExpenseDocument,
    "\n  query GetAllDocuments($request: GetAllDocumentsRequestInput!) {\n    allDocuments(request: $request) {\n      data {\n        documents {\n          documentId\n          category\n          fileName\n          fileUrl\n          expiryDate\n          status\n          rejectionReason\n        }\n      }\n    }\n  }\n": typeof types.GetAllDocumentsDocument,
    "\n  query GetAllExpenses($request: GetAllExpensesRequestInput!) {\n    allExpenses(request: $request) {\n      data {\n        expenses {\n          expenseId\n          expenseDate\n          category\n          amount\n          currency\n          description\n          status\n          approvedByUserId\n        }\n      }\n    }\n  }\n": typeof types.GetAllExpensesDocument,
    "\n  query GetAllLeaves($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          status\n          reason\n        }\n      }\n    }\n  }\n": typeof types.GetAllLeavesDocument,
    "\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n": typeof types.GetOnboardingTasksDocument,
    "\n  query GetAllPayrolls($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          countryCode\n          status\n        }\n      }\n    }\n  }\n": typeof types.GetAllPayrollsDocument,
    "\n  query GetGoals($request: GetAllGoalsRequestInput!) {\n    goals(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        currentValue\n        targetValue\n        status\n      }\n    }\n  }\n": typeof types.GetGoalsDocument,
    "\n  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {\n    recognitions(request: $request) {\n      items {\n        id\n        giverId\n        receiverId\n        message\n        category\n        createdOn\n      }\n    }\n  }\n": typeof types.GetRecognitionsDocument,
    "\n  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {\n    jobPostings(request: $request) {\n      items {\n        id\n        title\n        description\n        department\n        location\n        status\n      }\n    }\n  }\n": typeof types.GetJobPostingsDocument,
    "\n  query GetAllTeamMembers($request: GetAllTeamMembersRequestInput!) {\n    allTeamMembers(request: $request) {\n      data {\n        teamMembers {\n          memberId\n          firstName\n          lastName\n          email\n          designation\n          department\n          dateOfJoining\n          status\n        }\n      }\n    }\n  }\n": typeof types.GetAllTeamMembersDocument,
    "\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n": typeof types.GetTrainingModulesDocument,
};
const documents: Documents = {
    "\n  query GetAnalyticsReports($request: GetAllReportsRequestInput!) {\n    analyticsReports(request: $request) {\n      items {\n        id\n        title\n        category\n        dataJson\n        generatedDate\n      }\n    }\n  }\n": types.GetAnalyticsReportsDocument,
    "\n  query GetAnnouncements($request: GetAllAnnouncementsRequestInput!) {\n    announcements(request: $request) {\n      items {\n        id\n        title\n        content\n        category\n        priority\n        postedDate\n        expiryDate\n        views\n        likes\n      }\n    }\n  }\n": types.GetAnnouncementsDocument,
    "\n  query GetAllAttendance($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n": types.GetAllAttendanceDocument,
    "\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n": types.GetContributionsDocument,
    "\n  query GetDashboardStats(\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n": types.GetDashboardStatsDocument,
    "\n  mutation CreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n": types.CreateAttendanceDocument,
    "\n  mutation CreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n": types.CreateLeaveDocument,
    "\n  mutation CreateDocument($request: CreateDocumentRequestInput!) {\n    createDocument(request: $request) {\n      data {\n        documentId\n      }\n    }\n  }\n": types.CreateDocumentDocument,
    "\n  mutation CreateExpense($request: CreateExpenseRequestInput!) {\n    createExpense(request: $request) {\n      data {\n        expenseId\n      }\n    }\n  }\n": types.CreateExpenseDocument,
    "\n  query GetAllDocuments($request: GetAllDocumentsRequestInput!) {\n    allDocuments(request: $request) {\n      data {\n        documents {\n          documentId\n          category\n          fileName\n          fileUrl\n          expiryDate\n          status\n          rejectionReason\n        }\n      }\n    }\n  }\n": types.GetAllDocumentsDocument,
    "\n  query GetAllExpenses($request: GetAllExpensesRequestInput!) {\n    allExpenses(request: $request) {\n      data {\n        expenses {\n          expenseId\n          expenseDate\n          category\n          amount\n          currency\n          description\n          status\n          approvedByUserId\n        }\n      }\n    }\n  }\n": types.GetAllExpensesDocument,
    "\n  query GetAllLeaves($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          status\n          reason\n        }\n      }\n    }\n  }\n": types.GetAllLeavesDocument,
    "\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n": types.GetOnboardingTasksDocument,
    "\n  query GetAllPayrolls($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          countryCode\n          status\n        }\n      }\n    }\n  }\n": types.GetAllPayrollsDocument,
    "\n  query GetGoals($request: GetAllGoalsRequestInput!) {\n    goals(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        currentValue\n        targetValue\n        status\n      }\n    }\n  }\n": types.GetGoalsDocument,
    "\n  query GetRecognitions($request: GetAllRecognitionsRequestInput!) {\n    recognitions(request: $request) {\n      items {\n        id\n        giverId\n        receiverId\n        message\n        category\n        createdOn\n      }\n    }\n  }\n": types.GetRecognitionsDocument,
    "\n  query GetJobPostings($request: GetAllJobPostingsRequestInput!) {\n    jobPostings(request: $request) {\n      items {\n        id\n        title\n        description\n        department\n        location\n        status\n      }\n    }\n  }\n": types.GetJobPostingsDocument,
    "\n  query GetAllTeamMembers($request: GetAllTeamMembersRequestInput!) {\n    allTeamMembers(request: $request) {\n      data {\n        teamMembers {\n          memberId\n          firstName\n          lastName\n          email\n          designation\n          department\n          dateOfJoining\n          status\n        }\n      }\n    }\n  }\n": types.GetAllTeamMembersDocument,
    "\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n": types.GetTrainingModulesDocument,
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
export function graphql(source: "\n  query GetAllAttendance($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllAttendance($request: GetAllAttendanceRequestInput!) {\n    getAllAttendance(request: $request) {\n      data {\n        attendanceRecords {\n          id\n          employeeId\n          date\n          clockInTime\n          clockOutTime\n          status\n          totalHours\n          overtimeHours\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContributions($request: GetAllContributionsRequestInput!) {\n    contributions(request: $request) {\n      items {\n        id\n        userId\n        title\n        description\n        category\n        points\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDashboardStats(\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDashboardStats(\n    $attendanceReq: GetAllAttendanceRequestInput!\n    $leaveReq: GetAllLeavesRequestInput!\n    $docReq: GetAllDocumentsRequestInput!\n    $payrollReq: GetAllPayrollsRequestInput!\n    $goalsReq: GetAllGoalsRequestInput!\n    $trainingReq: GetAllTrainingModulesRequestInput!\n    $annReq: GetAllAnnouncementsRequestInput!\n  ) {\n    getAllAttendance(request: $attendanceReq) {\n      data {\n        attendanceRecords {\n          status\n        }\n      }\n    }\n    getAllLeaves(request: $leaveReq) {\n      data {\n        leaves {\n          totalDays\n          status\n        }\n      }\n    }\n    allDocuments(request: $docReq) {\n      data {\n        documents {\n          status\n        }\n      }\n    }\n    allPayrolls(request: $payrollReq) {\n      data {\n        payrolls {\n          payPeriodEnd\n          netPay\n        }\n      }\n    }\n    goals(request: $goalsReq) {\n      items {\n        currentValue\n        targetValue\n      }\n    }\n    trainingModules(request: $trainingReq) {\n      items {\n        id\n      }\n    }\n    announcements(request: $annReq) {\n      items {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAttendance($request: CreateAttendanceRequestInput!) {\n    createAttendance(request: $request) {\n      data {\n        attendanceId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLeave($request: CreateLeaveRequestInput!) {\n    createLeave(request: $request) {\n      data {\n        leaveId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDocument($request: CreateDocumentRequestInput!) {\n    createDocument(request: $request) {\n      data {\n        documentId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDocument($request: CreateDocumentRequestInput!) {\n    createDocument(request: $request) {\n      data {\n        documentId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateExpense($request: CreateExpenseRequestInput!) {\n    createExpense(request: $request) {\n      data {\n        expenseId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateExpense($request: CreateExpenseRequestInput!) {\n    createExpense(request: $request) {\n      data {\n        expenseId\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetAllLeaves($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          status\n          reason\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllLeaves($request: GetAllLeavesRequestInput!) {\n    getAllLeaves(request: $request) {\n      data {\n        leaves {\n          id\n          employeeId\n          leaveType\n          startDate\n          endDate\n          totalDays\n          status\n          reason\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOnboardingTasks($request: GetAllOnboardingTasksRequestInput!) {\n    onboardingTasks(request: $request) {\n      items {\n        id\n        userId\n        phase\n        title\n        isCompleted\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllPayrolls($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          countryCode\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPayrolls($request: GetAllPayrollsRequestInput!) {\n    allPayrolls(request: $request) {\n      data {\n        payrolls {\n          payrollId\n          payPeriodStart\n          payPeriodEnd\n          grossPay\n          totalDeductions\n          netPay\n          countryCode\n          status\n        }\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetAllTeamMembers($request: GetAllTeamMembersRequestInput!) {\n    allTeamMembers(request: $request) {\n      data {\n        teamMembers {\n          memberId\n          firstName\n          lastName\n          email\n          designation\n          department\n          dateOfJoining\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTeamMembers($request: GetAllTeamMembersRequestInput!) {\n    allTeamMembers(request: $request) {\n      data {\n        teamMembers {\n          memberId\n          firstName\n          lastName\n          email\n          designation\n          department\n          dateOfJoining\n          status\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTrainingModules($request: GetAllTrainingModulesRequestInput!) {\n    trainingModules(request: $request) {\n      items {\n        id\n        title\n        description\n        category\n        contentUrl\n        isMandatory\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;