using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using OnboardingFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace OnboardingFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class OnboardingMutation
    {
        public async Task<OnboardingTaskDto> CreateOnboardingTask(CreateOnboardingTaskRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
