using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using AttendanceFeature.Application.DTO;
using AttendanceFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace AttendanceFeature.Application.Repository
{
    public interface IAttendanceRepository : IPostgresDbRepository<AttendanceRecord>
    {
        Task<(IEnumerable<AttendanceRecord> result, int count)> GetAllAttendanceWithCountAsync(GetAllAttendanceRequest request);
        Task<AttendanceRecord?> GetAttendanceAsync(GetAllAttendanceRequest request);
    }
}
