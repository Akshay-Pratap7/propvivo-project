using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using AnalyticsFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;

using HRMS.Core.Postgres.Repositories;
namespace AnalyticsFeature.Application.Repository
{
    public interface IAnalyticsRepository : IPostgresDbRepository<AnalyticsReport> { }
}
