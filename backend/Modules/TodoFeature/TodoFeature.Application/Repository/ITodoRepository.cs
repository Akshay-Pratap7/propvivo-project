using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using TodoFeature.Application.DTO;
using TodoFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace TodoFeature.Application.Repository
{
    public interface ITodoRepository : IPostgresDbRepository<Todo>
    {
        Task<(IEnumerable<Todo> result, int count)> GetAllTodosWithCountAsync(GetAllTodosRequest request);

        Task<Todo?> GetTodoAsync(GetAllTodosRequest request);
    }
}
