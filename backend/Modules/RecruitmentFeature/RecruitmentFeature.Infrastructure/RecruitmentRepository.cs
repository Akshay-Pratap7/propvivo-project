using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using RecruitmentFeature.Application.Repository;
using RecruitmentFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace RecruitmentFeature.Infrastructure
{
    public class RecruitmentEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<JobPosting>(entity => {
                entity.ToTable("JobPosting");
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<Candidate>(entity => {
                entity.ToTable("Candidate");
                entity.HasKey(e => e.Id);
            });
        }
    }

    public class RecruitmentRepository : PostgresDbRepository<JobPosting>, IRecruitmentRepository
    {
        public RecruitmentRepository(PostgresDbContext context, ILogger<RecruitmentRepository> logger, ITelemetryService telemetryService, IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor) { }
        public override string TableName { get; } = nameof(JobPosting);
        public override string GenerateId(JobPosting entity) => Guid.NewGuid().ToString();
    }
}
