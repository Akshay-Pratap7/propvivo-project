using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System.Linq.Expressions;
using PostgresBaseEntity = HRMS.Core.Postgres.Common.BaseEntity;

using HRMS.Core.Postgres.Repositories;
namespace HRMS.Core.Postgres.Repositories
{
    public interface IPostgresDbRepository<T> where T : PostgresBaseEntity
    {
        Task<T> AddItemAsync(T item);

        Task<T> DeleteItemAsync(string id);

        Task<T?> GetItemAsync(Expression<Func<T, bool>> predicate);

        Task<(IEnumerable<T> data, int count)> GetItemsWithCountAsync<TPropType>(
            Expression<Func<T, bool>> predicate,
            Request request,
            Expression<Func<T, TPropType>>? orderBy = null);

        Task<T> UpdateItemAsync(string id, T item);
    }
}
