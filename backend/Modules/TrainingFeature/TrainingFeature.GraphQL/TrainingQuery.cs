using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using TrainingFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace TrainingFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class TrainingQuery
    {
        public async Task<PagedResponse<TrainingModuleDto>> GetTrainingModules(GetAllTrainingModulesRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
