using HRMS.Core.Postgres.Extensions;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using AnnouncementsFeature.Application.DTO;
using AnnouncementsFeature.Application.Repository;
using AnnouncementsFeature.Domain;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Telemetry;

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AnnouncementsFeature.Infrastructure
{
    public class AnnouncementEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>(entity =>
            {
                entity.ToTable("Announcement");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.Title).HasMaxLength(256);
                entity.Property(e => e.Category).HasMaxLength(100);
                entity.Property(e => e.Priority).HasMaxLength(50);
                entity.Property(e => e.Scope).HasMaxLength(50);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.Category);
                entity.HasIndex(e => e.Priority);
                entity.HasIndex(e => e.IsActive);
            });
        }
    }

    public class AnnouncementRepository : PostgresDbRepository<Announcement>, IAnnouncementRepository
    {
        public AnnouncementRepository(
            PostgresDbContext context,
            ILogger<AnnouncementRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(Announcement);
        public override string GenerateId(Announcement entity) => Guid.NewGuid().ToString();

        public Expression<Func<Announcement, bool>> GetAllAnnouncementsQuery(GetAllAnnouncementsRequest request)
        {
            Expression<Func<Announcement, bool>> filter = x => x.DocumentType == nameof(Announcement);

            if (request.RequestParam == null)
                return filter;

            var param = request.RequestParam;

            if (!string.IsNullOrEmpty(param.Category))
                filter = filter.And(x => x.Category == param.Category);

            if (!string.IsNullOrEmpty(param.Priority))
                filter = filter.And(x => x.Priority == param.Priority);

            if (!string.IsNullOrEmpty(param.Scope))
                filter = filter.And(x => x.Scope == param.Scope);

            if (param.IsActive.HasValue)
                filter = filter.And(x => x.IsActive == param.IsActive.Value);

            if (!string.IsNullOrEmpty(param.Keyword))
            {
                var keyword = param.Keyword.ToLower().Trim();
                filter = filter.And(x => (x.Title != null && x.Title.ToLower().Contains(keyword)) || 
                                       (x.Content != null && x.Content.ToLower().Contains(keyword)));
            }

            return filter;
        }

        public async Task<(IEnumerable<Announcement> result, int count)> GetAllAnnouncementsWithCountAsync(GetAllAnnouncementsRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.PostedDate;
            return await GetItemsWithCountAsync(GetAllAnnouncementsQuery(request), request, orderBy);
        }

        public async Task<Announcement?> GetAnnouncementAsync(GetAllAnnouncementsRequest request)
        {
            return await GetItemAsync(GetAllAnnouncementsQuery(request));
        }
    }
}
