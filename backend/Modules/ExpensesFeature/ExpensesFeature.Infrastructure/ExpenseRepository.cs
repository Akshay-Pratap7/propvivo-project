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
using ExpensesFeature.Application.DTO;
using ExpensesFeature.Application.Repository;
using ExpensesFeature.Domain;

namespace ExpensesFeature.Infrastructure
{
    public class ExpenseEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ExpenseRecord>(entity =>
            {
                entity.ToTable("ExpenseRecord");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.UserId).HasMaxLength(128);
                entity.Property(e => e.Category).HasMaxLength(100);
                entity.Property(e => e.Currency).HasMaxLength(3);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.ApprovedByUserId).HasMaxLength(128);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.UserId);
                entity.HasIndex(e => e.ExpenseDate);
                entity.HasIndex(e => e.Category);
                entity.HasIndex(e => e.Status);
                entity.OwnsOne(e => e.UserContext);
            });
        }
    }

    public class ExpenseRepository : PostgresDbRepository<ExpenseRecord>, IExpenseRepository
    {
        public ExpenseRepository(
            PostgresDbContext context,
            ILogger<ExpenseRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(ExpenseRecord);

        public override string GenerateId(ExpenseRecord entity) => Guid.NewGuid().ToString();

        public Expression<Func<ExpenseRecord, bool>> GetAllExpensesQuery(GetAllExpensesRequest request)
        {
            Expression<Func<ExpenseRecord, bool>> filter = x => x.DocumentType == nameof(ExpenseRecord);

            if (request.RequestParam == null)
                return filter;

            var expenseRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(expenseRequest.ExpenseId))
                filter = filter.And(x => x.Id == expenseRequest.ExpenseId);

            if (!string.IsNullOrEmpty(expenseRequest.UserId))
                filter = filter.And(x => x.UserId == expenseRequest.UserId);

            if (!string.IsNullOrEmpty(expenseRequest.Category))
                filter = filter.And(x => x.Category == expenseRequest.Category);

            if (!string.IsNullOrEmpty(expenseRequest.Status))
                filter = filter.And(x => x.Status == expenseRequest.Status);

            if (expenseRequest.ExpenseDate != default)
                filter = filter.And(x => x.ExpenseDate.Date == expenseRequest.ExpenseDate.Date);

            if (!string.IsNullOrEmpty(expenseRequest.Keyword))
            {
                var keyword = expenseRequest.Keyword.ToLower().Trim();
                Expression<Func<ExpenseRecord, bool>> keywordFilter = n => false;

                Expression<Func<ExpenseRecord, bool>> description = a => a.Description != null && a.Description.ToLower().Contains(keyword);
                Expression<Func<ExpenseRecord, bool>> category = a => a.Category != null && a.Category.ToLower().Contains(keyword);

                keywordFilter = keywordFilter.Or(description).Or(category);
                filter = filter.And(keywordFilter);
            }

            return filter;
        }

        public async Task<(IEnumerable<ExpenseRecord> result, int count)> GetAllExpensesWithCountAsync(GetAllExpensesRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllExpensesQuery(request), request, orderBy);
        }

        public async Task<ExpenseRecord?> GetExpenseAsync(GetAllExpensesRequest request)
        {
            return await GetItemAsync(GetAllExpensesQuery(request));
        }
    }
}
