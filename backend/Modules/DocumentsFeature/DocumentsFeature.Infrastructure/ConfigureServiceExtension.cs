using DocumentsFeature.Application.Repository;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DocumentsFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddDocumentDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IDocumentRepository, DocumentRepository>();
            services.AddScoped<IPostgresEntityConfigurator, DocumentEntityConfigurator>();
            return services;
        }
    }
}
