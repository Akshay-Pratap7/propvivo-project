using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnalyticsFeature.GraphQL
{
    public static class AnalyticsGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddAnalyticsGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<AnalyticsQuery>()
                          .AddTypeExtension<AnalyticsMutation>();
        }
    }
}
