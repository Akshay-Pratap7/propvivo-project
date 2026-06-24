using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using RecognitionFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace RecognitionFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class RecognitionQuery
    {
        public async Task<PagedResponse<RecognitionDto>> GetRecognitions(GetAllRecognitionsRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
