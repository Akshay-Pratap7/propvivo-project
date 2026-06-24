using HRCopilotFeature.Application.Repository;
using HRCopilotFeature.Domain;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
namespace HRCopilotFeature.Application.DTO
{
    public class ChatHandler : IRequestHandler<ChatRequest, CopilotMessageDto>
    {
        private readonly ICopilotRepository _repository;
        public ChatHandler(ICopilotRepository repository) => _repository = repository;
        public async Task<CopilotMessageDto> Handle(ChatRequest request, CancellationToken cancellationToken)
        {
            var userMsg = new CopilotMessage { ConversationId = request.ConversationId, Role = "user", Content = request.Message };
            await _repository.AddItemAsync(userMsg);
            
            var assistantMsg = new CopilotMessage { ConversationId = request.ConversationId, Role = "assistant", Content = "I am your HR Copilot. I've received: " + request.Message };
            await _repository.AddItemAsync(assistantMsg);
            
            return new CopilotMessageDto { Id = assistantMsg.Id, Role = assistantMsg.Role, Content = assistantMsg.Content };
        }
    }
}
namespace HRCopilotFeature.Application.DTO
{
    public partial class ChatRequest : IRequest<CopilotMessageDto> { }
}
