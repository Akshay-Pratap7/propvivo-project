using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace AnnouncementsFeature.Domain
{
    public class Announcement : BaseEntity
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? Category { get; set; } // e.g., "General", "Policy", "Event", "Holiday"
        public string? Priority { get; set; } // e.g., "Low", "Medium", "High"
        public string? Scope { get; set; } // e.g., "Global", "Department", "Location"
        public string? TargetId { get; set; } // DepartmentId or LocationId if scope is not Global
        public DateTime PostedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public bool IsActive { get; set; } = true;
        public int Views { get; set; } = 0;
        public int Likes { get; set; } = 0;
    }
}
