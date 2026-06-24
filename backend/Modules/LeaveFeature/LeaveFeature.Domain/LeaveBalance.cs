using HRMS.Core.Postgres.Common;
namespace LeaveFeature.Domain
{
    public class LeaveBalance : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
        public int TotalEntitled { get; set; }
        public int Used { get; set; }
        public int Pending { get; set; }
        public int CarriedForward { get; set; }
    }
}
