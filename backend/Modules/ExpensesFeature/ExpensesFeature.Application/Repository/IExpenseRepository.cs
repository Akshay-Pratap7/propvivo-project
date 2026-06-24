using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using ExpensesFeature.Application.DTO;
using ExpensesFeature.Domain;

using HRMS.Core.Postgres.Repositories;
namespace ExpensesFeature.Application.Repository
{
    public interface IExpenseRepository : IPostgresDbRepository<ExpenseRecord>
    {
        Task<(IEnumerable<ExpenseRecord> result, int count)> GetAllExpensesWithCountAsync(GetAllExpensesRequest request);
        Task<ExpenseRecord?> GetExpenseAsync(GetAllExpensesRequest request);
    }
}
