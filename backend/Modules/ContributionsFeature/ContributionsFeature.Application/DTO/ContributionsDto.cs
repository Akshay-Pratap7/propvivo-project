using HRMS.Shared.Application.Common;
using System;

namespace ContributionsFeature.Application.DTO
{
    public class ValueContributionDto
    {
        public string? Id { get; set; }
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int Points { get; set; }
        public string? Status { get; set; }
    }

    public partial class CreateContributionRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
    }

    public partial class GetAllContributionsRequest : PagedRequest { }
}
