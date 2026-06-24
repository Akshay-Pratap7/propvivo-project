using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;

namespace AttendanceFeature.Domain
{
    public class AttendanceRecord : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public double? ClockInLatitude { get; set; }
        public double? ClockInLongitude { get; set; }
        public double? ClockOutLatitude { get; set; }
        public double? ClockOutLongitude { get; set; }
        public string? ClockInIP { get; set; }
        public string? ClockOutIP { get; set; }
        public string? ClockInSelfieUrl { get; set; }
        public string? Status { get; set; } // Present, Absent, Late, HalfDay, OnLeave
        public double? TotalHours { get; set; }
        public double? OvertimeHours { get; set; }
        public UserBase? UserContext { get; set; }
    }
}
