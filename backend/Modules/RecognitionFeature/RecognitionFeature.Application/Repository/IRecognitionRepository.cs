using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using RecognitionFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;

using HRMS.Core.Postgres.Repositories;
namespace RecognitionFeature.Application.Repository
{
    public interface IRecognitionRepository : IPostgresDbRepository<Recognition> { }
}
