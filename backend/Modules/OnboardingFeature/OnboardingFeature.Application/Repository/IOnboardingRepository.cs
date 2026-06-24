using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using OnboardingFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;

using HRMS.Core.Postgres.Repositories;
namespace OnboardingFeature.Application.Repository
{
    public interface IOnboardingRepository : IPostgresDbRepository<OnboardingTask> { }
}
