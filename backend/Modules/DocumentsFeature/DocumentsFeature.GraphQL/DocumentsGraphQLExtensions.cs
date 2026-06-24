using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DocumentsFeature.GraphQL
{
    public static class DocumentsGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddDocumentsGraphQL(this IRequestExecutorBuilder builder)
        {
            builder.AddTypeExtension<DocumentQuery>()
                   .AddTypeExtension<DocumentMutation>();
            return builder;
        }
    }
}
