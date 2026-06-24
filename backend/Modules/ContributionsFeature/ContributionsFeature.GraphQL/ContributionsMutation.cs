using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using ContributionsFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace ContributionsFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class ContributionsMutation
    {
        public async Task<ValueContributionDto> CreateContribution(CreateContributionRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
