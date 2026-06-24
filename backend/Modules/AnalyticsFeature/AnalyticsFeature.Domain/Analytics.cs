using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace AnalyticsFeature.Domain
{
    public class AnalyticsReport : BaseEntity
    {
        public string? Title { get; set; }
        public string? Category { get; set; } // Attendance, Payroll, Performance
        public string? DataJson { get; set; }
        public DateTime GeneratedDate { get; set; }
    }
}
