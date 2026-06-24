using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace HRCopilotFeature.GraphQL
{
    public static class GraphQLModuleRegistration
    {
        public static IRequestExecutorBuilder AddCopilotGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<CopilotMutation>();
        }
    }
}
