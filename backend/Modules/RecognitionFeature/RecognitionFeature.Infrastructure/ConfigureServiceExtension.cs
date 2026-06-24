using RecognitionFeature.Application.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace RecognitionFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddRecognitionDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IRecognitionRepository, RecognitionRepository>();
            return services;
        }
    }
}
