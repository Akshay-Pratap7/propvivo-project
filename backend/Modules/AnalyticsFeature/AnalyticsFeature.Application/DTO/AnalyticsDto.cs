using HRMS.Shared.Application.Common;
using System;

namespace AnalyticsFeature.Application.DTO
{
    public class AnalyticsReportDto
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public string? DataJson { get; set; }
        public DateTime GeneratedDate { get; set; }
    }

    public class GenerateReportRequest
    {
        public string? Title { get; set; }
        public string? Category { get; set; }
    }

    public class GetAllReportsRequest : PagedRequest { }
}
