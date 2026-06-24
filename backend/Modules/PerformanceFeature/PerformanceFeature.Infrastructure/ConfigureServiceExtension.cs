using PerformanceFeature.Application.Repository;
using PerformanceFeature.Infrastructure;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PerformanceFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddPerformanceDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IPerformanceRepository, PerformanceRepository>();
            services.AddScoped<IPostgresEntityConfigurator, PerformanceEntityConfigurator>();
            return services;
        }
    }
}
