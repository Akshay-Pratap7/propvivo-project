using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRCopilotFeature.Application.Repository;
using HRCopilotFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
namespace HRCopilotFeature.Infrastructure
{
    public class CopilotEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CopilotConversation>(entity => {
                entity.ToTable("CopilotConversation");
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<CopilotMessage>(entity => {
                entity.ToTable("CopilotMessage");
                entity.HasKey(e => e.Id);
            });
        }
    }
    public class CopilotRepository : PostgresDbRepository<CopilotMessage>, ICopilotRepository
    {
        public CopilotRepository(PostgresDbContext context, ILogger<CopilotRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(CopilotMessage);
        public override string GenerateId(CopilotMessage entity) => Guid.NewGuid().ToString();
    }
}
