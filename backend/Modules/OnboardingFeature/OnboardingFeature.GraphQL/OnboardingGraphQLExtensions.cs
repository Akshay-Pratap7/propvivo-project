using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OnboardingFeature.GraphQL
{
    public static class OnboardingGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddOnboardingGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<OnboardingQuery>()
                          .AddTypeExtension<OnboardingMutation>();
        }
    }
}
