using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using ContributionsFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace ContributionsFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class ContributionsQuery
    {
        public async Task<PagedResponse<ValueContributionDto>> GetContributions(GetAllContributionsRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
