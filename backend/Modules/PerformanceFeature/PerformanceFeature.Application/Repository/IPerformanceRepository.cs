using PerformanceFeature.Application.DTO;
using PerformanceFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

using HRMS.Core.Postgres.Repositories;
namespace PerformanceFeature.Application.Repository
{
    public interface IPerformanceRepository : IPostgresDbRepository<Goal>
    {
    }
}
