using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ContributionsFeature.GraphQL
{
    public static class ContributionsGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddContributionsGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<ContributionsQuery>()
                          .AddTypeExtension<ContributionsMutation>();
        }
    }
}
