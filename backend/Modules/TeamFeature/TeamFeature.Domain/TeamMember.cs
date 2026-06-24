using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;
using System;

namespace TeamFeature.Domain
{
    public class TeamMember : BaseEntity
    {
        public string? UserId { get; set; }
        public UserBase? UserContext { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public DateTime DateOfJoining { get; set; }
        public string? Status { get; set; } // active, inactive, on-leave
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
