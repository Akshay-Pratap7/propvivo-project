using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RecognitionFeature.GraphQL
{
    public static class RecognitionGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddRecognitionGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<RecognitionQuery>()
                          .AddTypeExtension<RecognitionMutation>();
        }
    }
}
