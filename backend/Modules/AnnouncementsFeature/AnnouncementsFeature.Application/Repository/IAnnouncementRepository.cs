using AnnouncementsFeature.Application.DTO;
using AnnouncementsFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using System.Linq.Expressions;

namespace AnnouncementsFeature.Application.Repository
{
    public interface IAnnouncementRepository : IPostgresDbRepository<Announcement>
    {
        Expression<Func<Announcement, bool>> GetAllAnnouncementsQuery(GetAllAnnouncementsRequest request);
        Task<(IEnumerable<Announcement> result, int count)> GetAllAnnouncementsWithCountAsync(GetAllAnnouncementsRequest request);
        Task<Announcement?> GetAnnouncementAsync(GetAllAnnouncementsRequest request);
    }
}
