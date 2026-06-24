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

    public partial class GenerateReportRequest
    {
        public string? Title { get; set; }
        public string? Category { get; set; }
    }

    public partial class GetAllReportsRequest : PagedRequest { }
}
