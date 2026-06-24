using HRCopilotFeature.Application.DTO;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
namespace HRCopilotFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class CopilotMutation
    {
        public async Task<CopilotMessageDto> Chat(ChatRequest request, [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
