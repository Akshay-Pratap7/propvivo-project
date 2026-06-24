using TrainingFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace TrainingFeature.Application.Repository
{
    public interface ITrainingRepository : IPostgresDbRepository<TrainingModule> { }
}
