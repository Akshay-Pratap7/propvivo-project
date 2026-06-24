using PayrollFeature.Application.Repository;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PayrollFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddPayrollDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IPayrollRepository, PayrollRepository>();
            services.AddScoped<IPostgresEntityConfigurator, PayrollEntityConfigurator>();
            return services;
        }
    }
}
