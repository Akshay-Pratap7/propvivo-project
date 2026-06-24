using HRMS.Shared.Domain.Entity;

namespace LeaveFeature.Application.DTO
{
    public class CreateLeaveResponse
    {
        public string? LeaveId { get; set; }
    }

    public class UpdateLeaveResponse
    {
        public string? LeaveId { get; set; }
    }

    public class DeleteLeaveResponse
    {
        public string? LeaveId { get; set; }
    }

    public class GetAllLeavesItem
    {
        public string? Id { get; set; }
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double TotalDays { get; set; }
        public string? Status { get; set; }
        public string? Reason { get; set; }
        public UserBase? UserContext { get; set; }
    }

    public class GetAllLeavesResponse
    {
        public List<GetAllLeavesItem>? Leaves { get; set; }
    }
}
