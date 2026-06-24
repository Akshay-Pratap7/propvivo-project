using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace ContributionsFeature.Domain
{
    public class ValueContribution : BaseEntity
    {
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; } // Innovation, ProcessImprovement
        public int Points { get; set; }
        public string? ImpactLevel { get; set; }
        public string? EvidenceUrl { get; set; }
        public string? Status { get; set; } // Proposal, InProgress, UnderReview, Completed
    }
}
