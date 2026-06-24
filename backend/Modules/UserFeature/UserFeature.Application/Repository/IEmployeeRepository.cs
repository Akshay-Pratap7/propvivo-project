using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using UserFeature.Application.DTO;
using UserFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace UserFeature.Application.Repository
{
    public interface IEmployeeRepository : IPostgresDbRepository<Employee>
    {
        Task<(IEnumerable<Employee> result, int count)> GetAllEmployeesWithCountAsync(GetAllEmployeesRequest request);
        Task<Employee?> GetEmployeeAsync(GetAllEmployeesRequest request);
    }
}
