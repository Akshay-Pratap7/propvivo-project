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
using LeaveFeature.Application.DTO;
using LeaveFeature.Application.Repository;
using LeaveFeature.Domain;

namespace LeaveFeature.Infrastructure
{
    public class LeaveEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LeaveRequest>(entity =>
            {
                entity.ToTable("LeaveRequest");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.Status);
                entity.OwnsOne(e => e.UserContext);
            });

            modelBuilder.Entity<LeaveBalance>(entity => {
                entity.ToTable("LeaveBalance");
                entity.HasKey(e => e.Id);
            
            });
        }
    }

    public class LeaveRepository : PostgresDbRepository<LeaveRequest>, ILeaveRepository
    {
        public LeaveRepository(
            PostgresDbContext context,
            ILogger<LeaveRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(LeaveRequest);

        public override string GenerateId(LeaveRequest entity) => Guid.NewGuid().ToString();

        public Expression<Func<LeaveRequest, bool>> GetAllLeavesQuery(GetAllLeavesRequest request)
        {
            Expression<Func<LeaveRequest, bool>> filter = x => x.DocumentType == nameof(LeaveRequest);

            if (request.RequestParam == null)
                return filter;

            var leaveRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(leaveRequest.LeaveId))
                filter = filter.And(x => x.Id == leaveRequest.LeaveId);

            if (!string.IsNullOrEmpty(leaveRequest.EmployeeId))
                filter = filter.And(x => x.EmployeeId == leaveRequest.EmployeeId);

            if (!string.IsNullOrEmpty(leaveRequest.Status))
                filter = filter.And(x => x.Status == leaveRequest.Status);

            if (!string.IsNullOrEmpty(leaveRequest.LeaveType))
                filter = filter.And(x => x.LeaveType == leaveRequest.LeaveType);

            return filter;
        }

        public async Task<(IEnumerable<LeaveRequest> result, int count)> GetAllLeavesWithCountAsync(GetAllLeavesRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllLeavesQuery(request), request, orderBy);
        }

        public async Task<LeaveRequest?> GetLeaveAsync(GetAllLeavesRequest request)
        {
            return await GetItemAsync(GetAllLeavesQuery(request));
        }
    }
}
