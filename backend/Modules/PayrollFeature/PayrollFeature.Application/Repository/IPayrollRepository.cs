using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using PayrollFeature.Application.DTO;
using PayrollFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace PayrollFeature.Application.Repository
{
    public interface IPayrollRepository : IPostgresDbRepository<PayrollRecord>
    {
        Task<(IEnumerable<PayrollRecord> result, int count)> GetAllPayrollsWithCountAsync(GetAllPayrollsRequest request);
        Task<PayrollRecord?> GetPayrollAsync(GetAllPayrollsRequest request);
    }
}
