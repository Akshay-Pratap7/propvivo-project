using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using TrainingFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace TrainingFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class TrainingMutation
    {
        public async Task<TrainingModuleDto> CreateTrainingModule(CreateTrainingModuleRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
