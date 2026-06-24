using HRCopilotFeature.Domain;
using HRMS.Core.Postgres.Interfaces;
namespace HRCopilotFeature.Application.Repository
{
    public interface ICopilotRepository : IPostgresDbRepository<CopilotMessage>
    {
    }
}
