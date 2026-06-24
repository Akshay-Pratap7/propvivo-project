using HRCopilotFeature.Application.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace HRCopilotFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddCopilotDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ICopilotRepository, CopilotRepository>();
            return services;
        }
    }
}
