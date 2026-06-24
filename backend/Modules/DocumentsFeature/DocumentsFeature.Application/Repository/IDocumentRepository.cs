using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using DocumentsFeature.Application.DTO;
using DocumentsFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace DocumentsFeature.Application.Repository
{
    public interface IDocumentRepository : IPostgresDbRepository<EmployeeDocument>
    {
        Task<(IEnumerable<EmployeeDocument> result, int count)> GetAllDocumentsWithCountAsync(GetAllDocumentsRequest request);
        Task<EmployeeDocument?> GetDocumentAsync(GetAllDocumentsRequest request);
    }
}
