using HRMS.Shared.Application.Common;
using System;

namespace PerformanceFeature.Application.DTO
{
    public class GoalDto
    {
        public string? Id { get; set; }
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public decimal Weight { get; set; }
        public decimal TargetValue { get; set; }
        public decimal CurrentValue { get; set; }
        public string? Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public partial class CreateGoalRequest
    {
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public decimal Weight { get; set; }
        public decimal TargetValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public partial class GetAllGoalsRequest : PagedRequest
    {
        public string? UserId { get; set; }
        public string? Status { get; set; }
    }
}
