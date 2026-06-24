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
using DocumentsFeature.Application.DTO;
using DocumentsFeature.Application.Repository;
using DocumentsFeature.Domain;

namespace DocumentsFeature.Infrastructure
{
    public class DocumentEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeDocument>(entity =>
            {
                entity.ToTable("EmployeeDocument");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.Category).HasMaxLength(128);
                entity.Property(e => e.FileName).HasMaxLength(500);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.UserId);
                entity.HasIndex(e => e.Category);
                entity.OwnsOne(e => e.UserContext);
            });
        }
    }

    public class DocumentRepository : PostgresDbRepository<EmployeeDocument>, IDocumentRepository
    {
        public DocumentRepository(
            PostgresDbContext context,
            ILogger<DocumentRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(EmployeeDocument);

        public override string GenerateId(EmployeeDocument entity) => Guid.NewGuid().ToString();

        public Expression<Func<EmployeeDocument, bool>> GetAllDocumentsQuery(GetAllDocumentsRequest request)
        {
            Expression<Func<EmployeeDocument, bool>> filter = x => x.DocumentType == nameof(EmployeeDocument);

            if (request.RequestParam == null)
                return filter;

            var docRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(docRequest.DocumentId))
                filter = filter.And(x => x.Id == docRequest.DocumentId);

            if (!string.IsNullOrEmpty(docRequest.UserId))
                filter = filter.And(x => x.UserId == docRequest.UserId);

            if (!string.IsNullOrEmpty(docRequest.Category))
                filter = filter.And(x => x.Category == docRequest.Category);

            if (!string.IsNullOrEmpty(docRequest.Status))
                filter = filter.And(x => x.Status == docRequest.Status);

            if (!string.IsNullOrEmpty(docRequest.Keyword))
            {
                var keyword = docRequest.Keyword.ToLower().Trim();
                Expression<Func<EmployeeDocument, bool>> keywordFilter = n => false;

                Expression<Func<EmployeeDocument, bool>> fileName = a => a.FileName != null && a.FileName.ToLower().Contains(keyword);
                Expression<Func<EmployeeDocument, bool>> category = a => a.Category != null && a.Category.ToLower().Contains(keyword);

                keywordFilter = keywordFilter.Or(fileName).Or(category);
                filter = filter.And(keywordFilter);
            }

            return filter;
        }

        public async Task<(IEnumerable<EmployeeDocument> result, int count)> GetAllDocumentsWithCountAsync(GetAllDocumentsRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllDocumentsQuery(request), request, orderBy);
        }

        public async Task<EmployeeDocument?> GetDocumentAsync(GetAllDocumentsRequest request)
        {
            return await GetItemAsync(GetAllDocumentsQuery(request));
        }
    }
}
