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
using PayrollFeature.Application.DTO;
using PayrollFeature.Application.Repository;
using PayrollFeature.Domain;

namespace PayrollFeature.Infrastructure
{
    public class PayrollEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PayrollRecord>(entity =>
            {
                entity.ToTable("PayrollRecord");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.UserId).HasMaxLength(128);
                entity.Property(e => e.Currency).HasMaxLength(3);
                entity.Property(e => e.CountryCode).HasMaxLength(2);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.UserId);
                entity.HasIndex(e => e.PayPeriodStart);
                entity.HasIndex(e => e.PayPeriodEnd);
                entity.OwnsOne(e => e.UserContext);
            });

            modelBuilder.Entity<PayrollComponent>(entity => {
                entity.ToTable("PayrollComponent");
                entity.HasKey(e => e.Id);
            
            });
        }
    }

    public class PayrollRepository : PostgresDbRepository<PayrollRecord>, IPayrollRepository
    {
        public PayrollRepository(
            PostgresDbContext context,
            ILogger<PayrollRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(PayrollRecord);

        public override string GenerateId(PayrollRecord entity) => Guid.NewGuid().ToString();

        public Expression<Func<PayrollRecord, bool>> GetAllPayrollsQuery(GetAllPayrollsRequest request)
        {
            Expression<Func<PayrollRecord, bool>> filter = x => x.DocumentType == nameof(PayrollRecord);

            if (request.RequestParam == null)
                return filter;

            var payrollRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(payrollRequest.PayrollId))
                filter = filter.And(x => x.Id == payrollRequest.PayrollId);

            if (!string.IsNullOrEmpty(payrollRequest.UserId))
                filter = filter.And(x => x.UserId == payrollRequest.UserId);

            if (!string.IsNullOrEmpty(payrollRequest.CountryCode))
                filter = filter.And(x => x.CountryCode == payrollRequest.CountryCode);

            if (!string.IsNullOrEmpty(payrollRequest.Status))
                filter = filter.And(x => x.Status == payrollRequest.Status);

            if (payrollRequest.PayPeriodStart != default)
                filter = filter.And(x => x.PayPeriodStart >= payrollRequest.PayPeriodStart);

            if (payrollRequest.PayPeriodEnd != default)
                filter = filter.And(x => x.PayPeriodEnd <= payrollRequest.PayPeriodEnd);

            if (!string.IsNullOrEmpty(payrollRequest.Keyword))
            {
                var keyword = payrollRequest.Keyword.ToLower().Trim();
                Expression<Func<PayrollRecord, bool>> keywordFilter = n => false;

                Expression<Func<PayrollRecord, bool>> countryCode = a => a.CountryCode != null && a.CountryCode.ToLower().Contains(keyword);
                Expression<Func<PayrollRecord, bool>> status = a => a.Status != null && a.Status.ToLower().Contains(keyword);

                keywordFilter = keywordFilter.Or(countryCode).Or(status);
                filter = filter.And(keywordFilter);
            }

            return filter;
        }

        public async Task<(IEnumerable<PayrollRecord> result, int count)> GetAllPayrollsWithCountAsync(GetAllPayrollsRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllPayrollsQuery(request), request, orderBy);
        }

        public async Task<PayrollRecord?> GetPayrollAsync(GetAllPayrollsRequest request)
        {
            return await GetItemAsync(GetAllPayrollsQuery(request));
        }
    }
}
