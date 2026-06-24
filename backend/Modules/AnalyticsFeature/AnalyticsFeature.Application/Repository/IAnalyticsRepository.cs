using AnalyticsFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace AnalyticsFeature.Application.Repository
{
    public interface IAnalyticsRepository : IPostgresDbRepository<AnalyticsReport> { }
}
