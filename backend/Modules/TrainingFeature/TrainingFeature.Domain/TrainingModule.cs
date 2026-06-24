using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace TrainingFeature.Domain
{
    public class TrainingModule : BaseEntity
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? ContentUrl { get; set; }
        public bool IsMandatory { get; set; }
    }

    public class EmployeeTraining : BaseEntity
    {
        public string? UserId { get; set; }
        public string? TrainingModuleId { get; set; }
        public decimal Progress { get; set; }
        public string? Status { get; set; } // NotStarted, InProgress, Completed
        public DateTime? CompletionDate { get; set; }
        public string? CertificateUrl { get; set; }
    }
}
