using HRMS.Shared.Domain.Entity;

namespace UserFeature.Application.DTO
{
    public class CreateEmployeeResponse
    {
        public string? EmployeeId { get; set; }
    }

    public class UpdateEmployeeResponse
    {
        public string? EmployeeId { get; set; }
    }

    public class DeleteEmployeeResponse
    {
        public string? EmployeeId { get; set; }
    }

    public class GetAllEmployeesItem
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string? Role { get; set; }
        public string? Status { get; set; }
        public string? Country { get; set; }
        public UserBase? UserContext { get; set; }
    }

    public class GetAllEmployeesResponse
    {
        public List<GetAllEmployeesItem>? Employees { get; set; }
    }
}
