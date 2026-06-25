using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using RecruitmentFeature.Application.Repository;

namespace RecruitmentFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddRecruitmentDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddEnumerable(ServiceDescriptor.Scoped<IPostgresEntityConfigurator, RecruitmentEntityConfigurator>());
            services.AddScoped<IRecruitmentRepository, RecruitmentRepository>();
            return services;
        }
    }
}
