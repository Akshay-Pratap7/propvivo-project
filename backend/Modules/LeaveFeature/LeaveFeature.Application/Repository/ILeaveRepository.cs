using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using LeaveFeature.Application.DTO;
using LeaveFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace LeaveFeature.Application.Repository
{
    public interface ILeaveRepository : IPostgresDbRepository<LeaveRequest>
    {
        Task<(IEnumerable<LeaveRequest> result, int count)> GetAllLeavesWithCountAsync(GetAllLeavesRequest request);
        Task<LeaveRequest?> GetLeaveAsync(GetAllLeavesRequest request);
    }
}
