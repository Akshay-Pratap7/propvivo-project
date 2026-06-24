using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using AnalyticsFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace AnalyticsFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class AnalyticsMutation
    {
        public async Task<AnalyticsReportDto> GenerateReport(GenerateReportRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
