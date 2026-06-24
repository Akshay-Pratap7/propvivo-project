using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using OnboardingFeature.Application.Repository;
using OnboardingFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace OnboardingFeature.Infrastructure
{
    public class OnboardingEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OnboardingTask>(entity => {
                entity.ToTable("OnboardingTask");
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<WelcomeMessage>(entity => {
                entity.ToTable("WelcomeMessage");
                entity.HasKey(e => e.Id);
            });
        }
    }

    public class OnboardingRepository : PostgresDbRepository<OnboardingTask>, IOnboardingRepository
    {
        public OnboardingRepository(PostgresDbContext context, ILogger<OnboardingRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(OnboardingTask);
        public override string GenerateId(OnboardingTask entity) => Guid.NewGuid().ToString();
    }
}
