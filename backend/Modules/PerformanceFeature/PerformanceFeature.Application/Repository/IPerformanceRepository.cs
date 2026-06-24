using PerformanceFeature.Application.DTO;
using PerformanceFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace PerformanceFeature.Application.Repository
{
    public interface IPerformanceRepository : IPostgresDbRepository<Goal>
    {
    }
}
