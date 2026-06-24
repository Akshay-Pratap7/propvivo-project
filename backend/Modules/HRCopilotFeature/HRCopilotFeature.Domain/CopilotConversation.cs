using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
namespace HRCopilotFeature.Domain
{
    public class CopilotConversation : BaseEntity
    {
        public string? UserId { get; set; }
        public string? Title { get; set; }
    }

    public class CopilotMessage : BaseEntity
    {
        public string? ConversationId { get; set; }
        public string? Role { get; set; } // user, assistant
        public string? Content { get; set; }
    }
}
