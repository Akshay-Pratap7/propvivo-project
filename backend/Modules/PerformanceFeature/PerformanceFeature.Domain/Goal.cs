using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace PerformanceFeature.Domain
{
    public class Goal : BaseEntity
    {
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; } // Individual, Team, Dept, Org
        public decimal Weight { get; set; }
        public decimal TargetValue { get; set; }
        public decimal CurrentValue { get; set; }
        public string? Status { get; set; } // NotStarted, InProgress, OnTrack, AtRisk, Completed, Cancelled
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class PerformanceReview : BaseEntity
    {
        public string? UserId { get; set; }
        public string? ReviewerId { get; set; }
        public string? Period { get; set; } // Quarterly, Annual
        public decimal Rating { get; set; }
        public string? Feedback { get; set; }
        public string? Status { get; set; } // Draft, Submitted, Completed
    }
}
