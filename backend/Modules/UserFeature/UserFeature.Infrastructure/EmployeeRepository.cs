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
using UserFeature.Application.DTO;
using UserFeature.Application.Repository;
using UserFeature.Domain;

namespace UserFeature.Infrastructure
{
    public class EmployeeEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.FirstName).HasMaxLength(200);
                entity.Property(e => e.LastName).HasMaxLength(200);
                entity.Property(e => e.Email).HasMaxLength(200);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.OwnsOne(e => e.UserContext);
            });
        }
    }

    public class EmployeeRepository : PostgresDbRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(
            PostgresDbContext context,
            ILogger<EmployeeRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(Employee);

        public override string GenerateId(Employee entity) => Guid.NewGuid().ToString();

        public Expression<Func<Employee, bool>> GetAllEmployeesQuery(GetAllEmployeesRequest request)
        {
            Expression<Func<Employee, bool>> filter = x => x.DocumentType == nameof(Employee);

            if (request.RequestParam == null)
                return filter;

            var employeeRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(employeeRequest.EmployeeId))
                filter = filter.And(x => x.Id == employeeRequest.EmployeeId);

            if (!string.IsNullOrEmpty(employeeRequest.Role))
                filter = filter.And(x => x.Role == employeeRequest.Role);

            if (!string.IsNullOrEmpty(employeeRequest.Department))
                filter = filter.And(x => x.Department == employeeRequest.Department);

            if (!string.IsNullOrEmpty(employeeRequest.Keyword))
            {
                var keyword = employeeRequest.Keyword.ToLower().Trim();
                Expression<Func<Employee, bool>> keywordFilter = n => false;

                Expression<Func<Employee, bool>> name = a => (a.FirstName != null && a.FirstName.ToLower().Contains(keyword)) || (a.LastName != null && a.LastName.ToLower().Contains(keyword));
                Expression<Func<Employee, bool>> email = a => a.Email != null && a.Email.ToLower().Contains(keyword);

                keywordFilter = keywordFilter.Or(name).Or(email);
                filter = filter.And(keywordFilter);
            }

            return filter;
        }

        public async Task<(IEnumerable<Employee> result, int count)> GetAllEmployeesWithCountAsync(GetAllEmployeesRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllEmployeesQuery(request), request, orderBy);
        }

        public async Task<Employee?> GetEmployeeAsync(GetAllEmployeesRequest request)
        {
            return await GetItemAsync(GetAllEmployeesQuery(request));
        }
    }
}
