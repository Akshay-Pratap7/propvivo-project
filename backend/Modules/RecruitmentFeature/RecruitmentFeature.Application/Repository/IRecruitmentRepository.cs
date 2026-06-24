using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using RecruitmentFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;

using HRMS.Core.Postgres.Repositories;
namespace RecruitmentFeature.Application.Repository
{
    public interface IRecruitmentRepository : IPostgresDbRepository<JobPosting> { }
}
