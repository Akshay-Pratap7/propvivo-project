using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using PerformanceFeature.Application.Repository;
using PerformanceFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace PerformanceFeature.Infrastructure
{
    public class PerformanceEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Goal>(entity =>
            {
                entity.ToTable("Goal");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
            });
            
            modelBuilder.Entity<PerformanceReview>(entity =>
            {
                entity.ToTable("PerformanceReview");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
            });
        }
    }

    public class PerformanceRepository : PostgresDbRepository<Goal>, IPerformanceRepository
    {
        public PerformanceRepository(
            PostgresDbContext context,
            ILogger<PerformanceRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(Goal);
        public override string GenerateId(Goal entity) => Guid.NewGuid().ToString();
    }
}
