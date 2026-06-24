using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using OnboardingFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace OnboardingFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class OnboardingQuery
    {
        public async Task<PagedResponse<OnboardingTaskDto>> GetOnboardingTasks(GetAllOnboardingTasksRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
