using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using TrainingFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;

using HRMS.Core.Postgres.Repositories;
namespace TrainingFeature.Application.Repository
{
    public interface ITrainingRepository : IPostgresDbRepository<TrainingModule> { }
}
