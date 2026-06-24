using TrainingFeature.Application.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace TrainingFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddTrainingDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ITrainingRepository, TrainingRepository>();
            return services;
        }
    }
}
