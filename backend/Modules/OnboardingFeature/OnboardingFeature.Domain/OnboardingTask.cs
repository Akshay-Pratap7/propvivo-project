using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace OnboardingFeature.Domain
{
    public class OnboardingTask : BaseEntity
    {
        public string? UserId { get; set; }
        public string? Phase { get; set; } // PreJoining, Day1, Week1, Month1
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class WelcomeMessage : BaseEntity
    {
        public string? UserId { get; set; }
        public string? FromRole { get; set; } // CEO, Manager, Buddy, HR
        public string? Message { get; set; }
        public string? VideoUrl { get; set; }
    }
}
