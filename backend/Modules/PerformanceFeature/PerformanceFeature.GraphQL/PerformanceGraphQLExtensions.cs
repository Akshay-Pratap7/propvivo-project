using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PerformanceFeature.GraphQL
{
    public static class PerformanceGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddPerformanceGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<PerformanceQuery>()
                          .AddTypeExtension<PerformanceMutation>();
        }
    }
}
