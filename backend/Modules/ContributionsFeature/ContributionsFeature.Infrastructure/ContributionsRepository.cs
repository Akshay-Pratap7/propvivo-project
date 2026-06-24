using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using ContributionsFeature.Application.Repository;
using ContributionsFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ContributionsFeature.Infrastructure
{
    public class ContributionsEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ValueContribution>(entity => {
                entity.ToTable("ValueContribution");
                entity.HasKey(e => e.Id);
            });

            modelBuilder.Entity<ContributionItem>(entity => {
                entity.ToTable("ContributionItem");
                entity.HasKey(e => e.Id);
            
            });
        }
    }

    public class ContributionsRepository : PostgresDbRepository<ValueContribution>, IContributionsRepository
    {
        public ContributionsRepository(PostgresDbContext context, ILogger<ContributionsRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(ValueContribution);
        public override string GenerateId(ValueContribution entity) => Guid.NewGuid().ToString();
    }
}
