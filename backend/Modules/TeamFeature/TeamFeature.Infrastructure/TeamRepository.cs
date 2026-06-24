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
using TeamFeature.Application.DTO;
using TeamFeature.Application.Repository;
using TeamFeature.Domain;

namespace TeamFeature.Infrastructure
{
    public class TeamEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TeamMember>(entity =>
            {
                entity.ToTable("TeamMember");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.UserId).HasMaxLength(128);
                entity.Property(e => e.FirstName).HasMaxLength(100);
                entity.Property(e => e.LastName).HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(256);
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.Department).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.UserId);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.Department);
                entity.HasIndex(e => e.Status);
                entity.OwnsOne(e => e.UserContext);
            });
        }
    }

    public class TeamRepository : PostgresDbRepository<TeamMember>, ITeamRepository
    {
        public TeamRepository(
            PostgresDbContext context,
            ILogger<TeamRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(TeamMember);

        public override string GenerateId(TeamMember entity) => Guid.NewGuid().ToString();

        public Expression<Func<TeamMember, bool>> GetAllTeamMembersQuery(GetAllTeamMembersRequest request)
        {
            Expression<Func<TeamMember, bool>> filter = x => x.DocumentType == nameof(TeamMember);

            if (request.RequestParam == null)
                return filter;

            var teamMemberRequest = request.RequestParam;

            if (!string.IsNullOrEmpty(teamMemberRequest.MemberId))
                filter = filter.And(x => x.Id == teamMemberRequest.MemberId);

            if (!string.IsNullOrEmpty(teamMemberRequest.UserId))
                filter = filter.And(x => x.UserId == teamMemberRequest.UserId);

            if (!string.IsNullOrEmpty(teamMemberRequest.Email))
                filter = filter.And(x => x.Email == teamMemberRequest.Email);

            if (!string.IsNullOrEmpty(teamMemberRequest.Department))
                filter = filter.And(x => x.Department == teamMemberRequest.Department);

            if (!string.IsNullOrEmpty(teamMemberRequest.Status))
                filter = filter.And(x => x.Status == teamMemberRequest.Status);

            if (!string.IsNullOrEmpty(teamMemberRequest.Keyword))
            {
                var keyword = teamMemberRequest.Keyword.ToLower().Trim();
                Expression<Func<TeamMember, bool>> keywordFilter = n => false;

                Expression<Func<TeamMember, bool>> firstName = a => a.FirstName != null && a.FirstName.ToLower().Contains(keyword);
                Expression<Func<TeamMember, bool>> lastName = a => a.LastName != null && a.LastName.ToLower().Contains(keyword);
                Expression<Func<TeamMember, bool>> email = a => a.Email != null && a.Email.ToLower().Contains(keyword);
                Expression<Func<TeamMember, bool>> designation = a => a.Designation != null && a.Designation.ToLower().Contains(keyword);
                Expression<Func<TeamMember, bool>> department = a => a.Department != null && a.Department.ToLower().Contains(keyword);

                keywordFilter = keywordFilter.Or(firstName).Or(lastName).Or(email).Or(designation).Or(department);
                filter = filter.And(keywordFilter);
            }

            return filter;
        }

        public async Task<(IEnumerable<TeamMember> result, int count)> GetAllTeamMembersWithCountAsync(GetAllTeamMembersRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(GetAllTeamMembersQuery(request), request, orderBy);
        }

        public async Task<TeamMember?> GetTeamMemberAsync(GetAllTeamMembersRequest request)
        {
            return await GetItemAsync(GetAllTeamMembersQuery(request));
        }
    }
}
