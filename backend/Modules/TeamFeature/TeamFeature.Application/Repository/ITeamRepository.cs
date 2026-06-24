using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using TeamFeature.Application.DTO;
using TeamFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace TeamFeature.Application.Repository
{
    public interface ITeamRepository : IPostgresDbRepository<TeamMember>
    {
        Task<(IEnumerable<TeamMember> result, int count)> GetAllTeamMembersWithCountAsync(GetAllTeamMembersRequest request);
        Task<TeamMember?> GetTeamMemberAsync(GetAllTeamMembersRequest request);
    }
}
