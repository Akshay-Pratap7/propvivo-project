using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using AttendanceFeature.Application.DTO;
using AttendanceFeature.Application.Repository;
using AttendanceFeature.Domain;

namespace AttendanceFeature.Infrastructure
{
    public class AttendanceEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AttendanceRecord>(entity =>
            {
                entity.ToTable("AttendanceRecord");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.Date);
                entity.OwnsOne(e => e.UserContext);
            });
        }
    }

    public class AttendanceRepository : PostgresDbRepository<AttendanceRecord>, IAttendanceRepository
    {
        public AttendanceRepository(
            PostgresDbContext context,
            ILogger<AttendanceRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(AttendanceRecord);

        public override string GenerateId(AttendanceRecord entity) => Guid.NewGuid().ToString();

        public Expression<Func<AttendanceRecord, bool>> GetAllAttendanceQuery(GetAllAttendanceRequest request)
        {
            Expression<Func<AttendanceRecord, bool>> filter = x => x.DocumentType == nameof(AttendanceRecord);

            if (request.RequestParam == null)
                return filter;

            var attendanceRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(attendanceRequest.AttendanceId))
                filter = filter.And(x => x.Id == attendanceRequest.AttendanceId);

            if (!string.IsNullOrEmpty(attendanceRequest.EmployeeId))
                filter = filter.And(x => x.EmployeeId == attendanceRequest.EmployeeId);

            if (attendanceRequest.StartDate.HasValue)
                filter = filter.And(x => x.Date >= attendanceRequest.StartDate.Value);

            if (attendanceRequest.EndDate.HasValue)
                filter = filter.And(x => x.Date <= attendanceRequest.EndDate.Value);

            if (!string.IsNullOrEmpty(attendanceRequest.Status))
                filter = filter.And(x => x.Status == attendanceRequest.Status);

            return filter;
        }

        public async Task<(IEnumerable<AttendanceRecord> result, int count)> GetAllAttendanceWithCountAsync(GetAllAttendanceRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllAttendanceQuery(request), request, orderBy);
        }

        public async Task<AttendanceRecord?> GetAttendanceAsync(GetAllAttendanceRequest request)
        {
            return await GetItemAsync(GetAllAttendanceQuery(request));
        }
    }
}
