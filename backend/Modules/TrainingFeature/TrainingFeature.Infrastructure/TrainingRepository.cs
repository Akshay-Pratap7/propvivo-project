using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using TrainingFeature.Application.Repository;
using TrainingFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace TrainingFeature.Infrastructure
{
    public class TrainingEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrainingModule>(entity => {
                entity.ToTable("TrainingModule");
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<EmployeeTraining>(entity => {
                entity.ToTable("EmployeeTraining");
                entity.HasKey(e => e.Id);
            });
        }
    }

    public class TrainingRepository : PostgresDbRepository<TrainingModule>, ITrainingRepository
    {
        public TrainingRepository(PostgresDbContext context, ILogger<TrainingRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(TrainingModule);
        public override string GenerateId(TrainingModule entity) => Guid.NewGuid().ToString();
    }
}
