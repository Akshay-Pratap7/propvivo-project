using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;

namespace DocumentsFeature.Domain
{
    public class EmployeeDocument : BaseEntity
    {
        public string? Category { get; set; } // identity, employment, work-auth, tax, education, other
        public string? FileName { get; set; }
        public string? FileUrl { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? Status { get; set; } // missing, uploaded, verified, rejected
        public string? RejectionReason { get; set; }
        public UserBase? UserContext { get; set; }
        public string? UserId { get; set; }
    }
}
