using HRMS.Shared.Application.Common;
using System;

namespace OnboardingFeature.Application.DTO
{
    public class OnboardingTaskDto
    {
        public string? Id { get; set; }
        public string? UserId { get; set; }
        public string? Phase { get; set; }
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }
    }

    public partial class CreateOnboardingTaskRequest
    {
        public string? UserId { get; set; }
        public string? Phase { get; set; }
        public string? Title { get; set; }
    }

    public partial class GetAllOnboardingTasksRequest : PagedRequest { }
}
