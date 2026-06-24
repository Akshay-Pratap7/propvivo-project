using HRMS.Shared.Application.Common;
using System;

namespace RecruitmentFeature.Application.DTO
{
    public class JobPostingDto
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
        public string? Status { get; set; }
    }

    public class CreateJobPostingRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
    }

    public class GetAllJobPostingsRequest : PagedRequest { }
}
