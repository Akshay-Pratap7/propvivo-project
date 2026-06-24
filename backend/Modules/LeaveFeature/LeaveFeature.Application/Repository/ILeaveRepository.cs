using HRMS.Core.Postgres.Repositories;
using LeaveFeature.Application.DTO;
using LeaveFeature.Domain;

namespace LeaveFeature.Application.Repository
{
    public interface ILeaveRepository : IPostgresRepository<LeaveRequest>
    {
        Task<(IEnumerable<LeaveRequest> result, int count)> GetAllLeavesWithCountAsync(GetAllLeavesRequest request);
        Task<LeaveRequest?> GetLeaveAsync(GetAllLeavesRequest request);
    }
}
