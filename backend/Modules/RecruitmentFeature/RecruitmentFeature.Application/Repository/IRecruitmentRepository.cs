using RecruitmentFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

using HRMS.Core.Postgres.Repositories;
namespace RecruitmentFeature.Application.Repository
{
    public interface IRecruitmentRepository : IPostgresDbRepository<JobPosting> { }
}
