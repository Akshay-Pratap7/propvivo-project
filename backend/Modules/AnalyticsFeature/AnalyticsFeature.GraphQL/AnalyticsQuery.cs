using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using AnalyticsFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace AnalyticsFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class AnalyticsQuery
    {
        public async Task<PagedResponse<AnalyticsReportDto>> GetAnalyticsReports(GetAllReportsRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
