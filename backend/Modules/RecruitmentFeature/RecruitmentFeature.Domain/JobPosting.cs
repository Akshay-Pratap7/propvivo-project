using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace RecruitmentFeature.Domain
{
    public class JobPosting : BaseEntity
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
        public string? Requirements { get; set; }
        public string? Responsibilities { get; set; }
        public string? Status { get; set; } // Open, Closed
    }

    public class Candidate : BaseEntity
    {
        public string? JobPostingId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? ResumeUrl { get; set; }
        public string? Status { get; set; } // New, Screening, Shortlisted, Interviewing, Hired, Rejected
    }
}
