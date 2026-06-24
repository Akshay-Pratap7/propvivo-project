using RecognitionFeature.Domain;
using HRMS.Core.Postgres.Interfaces;

namespace RecognitionFeature.Application.Repository
{
    public interface IRecognitionRepository : IPostgresDbRepository<Recognition> { }
}
