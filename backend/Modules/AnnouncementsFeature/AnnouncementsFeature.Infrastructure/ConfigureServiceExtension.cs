using AnnouncementsFeature.Application.Repository;
using AnnouncementsFeature.Infrastructure;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnnouncementsFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddAnnouncementDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
            services.AddScoped<IPostgresEntityConfigurator, AnnouncementEntityConfigurator>();
            return services;
        }
    }
}
