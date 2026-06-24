using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;

namespace LeaveFeature.Domain
{
    public class LeaveRequest : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; } // Casual, Sick, Earned, Maternity, Paternity
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double TotalDays { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; } // Pending, Approved, Rejected, Cancelled
        public string? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string? RejectionReason { get; set; }
        public string? AttachmentUrl { get; set; }
        public UserBase? UserContext { get; set; }
    }
}
