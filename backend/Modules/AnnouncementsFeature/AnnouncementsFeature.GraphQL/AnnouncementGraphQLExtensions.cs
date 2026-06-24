using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnnouncementsFeature.GraphQL
{
    public static class AnnouncementGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddAnnouncementsGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder.AddTypeExtension<AnnouncementQuery>()
                .AddTypeExtension<AnnouncementMutation>();
        }
    }
}
