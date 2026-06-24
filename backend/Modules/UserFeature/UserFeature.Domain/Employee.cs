using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;

namespace UserFeature.Domain
{
    public class Employee : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string? ManagerId { get; set; }
        public string? ReportingManagerId { get; set; }
        public string? Role { get; set; } // Employee, Manager, HR, Admin
        public string? Status { get; set; } // Active, Inactive, Onboarding, Exit
        public string? Country { get; set; } // IN, US
        public string? OnboardingStatus { get; set; } // Pre-joining, Day-1, Week-1, Month-1, Completed
        public UserBase? UserContext { get; set; }
    }
}
