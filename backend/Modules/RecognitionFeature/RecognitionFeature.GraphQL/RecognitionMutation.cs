using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using RecognitionFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace RecognitionFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class RecognitionMutation
    {
        public async Task<RecognitionDto> CreateRecognition(CreateRecognitionRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
