namespace HRCopilotFeature.Application.DTO
{
    public class CopilotConversationDto
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
    }

    public class CopilotMessageDto
    {
        public string? Id { get; set; }
        public string? Role { get; set; }
        public string? Content { get; set; }
    }

    public partial class ChatRequest
    {
        public string? ConversationId { get; set; }
        public string? Message { get; set; }
    }
}
