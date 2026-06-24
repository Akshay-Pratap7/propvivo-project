using TeamFeature.Application.Repository;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TeamFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddTeamDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<IPostgresEntityConfigurator, TeamEntityConfigurator>();
            return services;
        }
    }
}
