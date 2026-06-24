using ContributionsFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace ContributionsFeature.Application.Repository
{
    public interface IContributionsRepository : IPostgresDbRepository<ValueContribution> { }
}
