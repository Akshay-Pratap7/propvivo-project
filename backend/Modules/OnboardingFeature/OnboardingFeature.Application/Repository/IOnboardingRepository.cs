using OnboardingFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace OnboardingFeature.Application.Repository
{
    public interface IOnboardingRepository : IPostgresDbRepository<OnboardingTask> { }
}
