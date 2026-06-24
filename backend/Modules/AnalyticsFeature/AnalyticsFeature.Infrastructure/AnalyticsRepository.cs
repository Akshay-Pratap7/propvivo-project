using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using AnalyticsFeature.Application.Repository;
using AnalyticsFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AnalyticsFeature.Infrastructure
{
    public class AnalyticsEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnalyticsReport>(entity => {
                entity.ToTable("AnalyticsReport");
                entity.HasKey(e => e.Id);
            });
        }
    }

    public class AnalyticsRepository : PostgresDbRepository<AnalyticsReport>, IAnalyticsRepository
    {
        public AnalyticsRepository(PostgresDbContext context, ILogger<AnalyticsRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(AnalyticsReport);
        public override string GenerateId(AnalyticsReport entity) => Guid.NewGuid().ToString();
    }
}
