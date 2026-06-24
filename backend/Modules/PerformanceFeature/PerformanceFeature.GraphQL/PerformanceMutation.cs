using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using PerformanceFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace PerformanceFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class PerformanceMutation
    {
        public async Task<GoalDto> CreateGoal(CreateGoalRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
