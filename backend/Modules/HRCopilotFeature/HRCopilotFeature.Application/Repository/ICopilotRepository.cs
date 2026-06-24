using HRCopilotFeature.Domain;
using HRMS.Core.Postgres.Repositories;
namespace HRCopilotFeature.Application.Repository
{
    public interface ICopilotRepository : IPostgresDbRepository<CopilotMessage>
    {
    }
}
