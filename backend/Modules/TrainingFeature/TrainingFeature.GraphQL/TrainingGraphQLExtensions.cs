using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TrainingFeature.GraphQL
{
    public static class TrainingGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddTrainingGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<TrainingQuery>()
                          .AddTypeExtension<TrainingMutation>();
        }
    }
}
