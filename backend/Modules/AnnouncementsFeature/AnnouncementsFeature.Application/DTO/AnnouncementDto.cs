using HRMS.Shared.Application.Common;
using System;

namespace AnnouncementsFeature.Application.DTO
{
    public class AnnouncementDto
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? Category { get; set; }
        public string? Priority { get; set; }
        public string? Scope { get; set; }
        public string? TargetId { get; set; }
        public DateTime PostedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public bool IsActive { get; set; }
        public int Views { get; set; }
        public int Likes { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? CreatedByUserName { get; set; }
    }

    public partial class CreateAnnouncementRequest
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? Category { get; set; }
        public string? Priority { get; set; }
        public string? Scope { get; set; }
        public string? TargetId { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }

    public partial class GetAllAnnouncementsRequest : PagedRequest
    {
        public AnnouncementFilter? RequestParam { get; set; }
    }

    public class AnnouncementFilter
    {
        public string? Category { get; set; }
        public string? Priority { get; set; }
        public string? Scope { get; set; }
        public bool? IsActive { get; set; }
        public string? Keyword { get; set; }
    }
}
