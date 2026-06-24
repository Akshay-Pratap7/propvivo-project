using RecruitmentFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace RecruitmentFeature.Application.Repository
{
    public interface IRecruitmentRepository : IPostgresDbRepository<JobPosting> { }
}
