using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using ContributionsFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;

using HRMS.Core.Postgres.Repositories;
namespace ContributionsFeature.Application.Repository
{
    public interface IContributionsRepository : IPostgresDbRepository<ValueContribution> { }
}
