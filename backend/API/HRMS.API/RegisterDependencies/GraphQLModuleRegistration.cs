using HotChocolate.Execution.Configuration;
using TodoFeature.GraphQL;
using UserFeature.GraphQL;
using AttendanceFeature.GraphQL;
using LeaveFeature.GraphQL;
using DocumentsFeature.GraphQL;
using PayrollFeature.GraphQL;
using ExpensesFeature.GraphQL;
using TeamFeature.GraphQL;
using AnnouncementsFeature.GraphQL;
using PerformanceFeature.GraphQL;
using TrainingFeature.GraphQL;
using RecognitionFeature.GraphQL;
using HRCopilotFeature.GraphQL;
using ContributionsFeature.GraphQL;
using RecruitmentFeature.GraphQL;
using AnalyticsFeature.GraphQL;
using OnboardingFeature.GraphQL;

namespace HRMS.API.RegisterDependencies
{
    public static class GraphQLModuleRegistration
    {
        public static IRequestExecutorBuilder AddGraphQLModules(this IRequestExecutorBuilder builder)
        {
            return builder.AddTodosGraphQL()
                .AddUserGraphQL()
                .AddAttendanceGraphQL()
                .AddLeaveGraphQL()
                .AddDocumentsGraphQL()
                .AddPayrollGraphQL()
                .AddExpensesGraphQL()
                .AddCopilotGraphQL()
                .AddTeamGraphQL()
                .AddAnnouncementsGraphQL() 
                .AddPerformanceGraphQL()
                .AddTrainingGraphQL()
                .AddRecognitionGraphQL()
                .AddContributionsGraphQL()
                .AddRecruitmentGraphQL()
                .AddAnalyticsGraphQL()
                .AddOnboardingGraphQL();
        }
    }
}
