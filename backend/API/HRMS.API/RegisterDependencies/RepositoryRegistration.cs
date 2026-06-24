using TodoFeature.Infrastructure;
using UserFeature.Infrastructure;
using AttendanceFeature.Infrastructure;
using LeaveFeature.Infrastructure;
using DocumentsFeature.Infrastructure;
using PayrollFeature.Infrastructure;
using ExpensesFeature.Infrastructure;
using TeamFeature.Infrastructure;
using AnnouncementsFeature.Infrastructure;
using PerformanceFeature.Infrastructure;
using TrainingFeature.Infrastructure;
using RecognitionFeature.Infrastructure;
using HRCopilotFeature.Infrastructure;
using ContributionsFeature.Infrastructure;

namespace HRMS.API.RegisterDependencies
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddModulesDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTodoDependency(configuration);
            services.AddUserDependency(configuration);
            services.AddAttendanceDependency(configuration);
            services.AddLeaveDependency(configuration);
            services.AddDocumentDependency(configuration);
            services.AddPayrollDependency(configuration);
            services.AddExpenseDependency(configuration);
            services.AddTeamDependency(configuration);
            services.AddAnnouncementDependency(configuration);
            services.AddPerformanceDependency(configuration);
            services.AddTrainingDependency(configuration);
            services.AddRecognitionDependency(configuration);
            services.AddCopilotDependency(configuration);
            services.AddContributionsDependency(configuration);
            return services;
        }
    }
}
