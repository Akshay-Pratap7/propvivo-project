using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using RecognitionFeature.Application.Repository;
using RecognitionFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace RecognitionFeature.Infrastructure
{
    public class RecognitionEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recognition>(entity => {
                entity.ToTable("Recognition");
                entity.HasKey(e => e.Id);
            });
        }
    }

    public class RecognitionRepository : PostgresDbRepository<Recognition>, IRecognitionRepository
    {
        public RecognitionRepository(PostgresDbContext context, ILogger<RecognitionRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(Recognition);
        public override string GenerateId(Recognition entity) => Guid.NewGuid().ToString();
    }
}
