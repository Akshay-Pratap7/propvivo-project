using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace LeaveFeature.Domain
{
    public class LeaveApproval : BaseEntity
    {
        public string? LeaveRequestId { get; set; }
        public string? ApproverId { get; set; }
        public int Level { get; set; } // 1 for Manager, 2 for HR
        public string? Status { get; set; } // Pending, Approved, Rejected
        public string? Comments { get; set; }
    }
}
