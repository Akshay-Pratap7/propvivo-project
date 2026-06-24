using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using PerformanceFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace PerformanceFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class PerformanceQuery
    {
        public async Task<PagedResponse<GoalDto>> GetGoals(
            GetAllGoalsRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
