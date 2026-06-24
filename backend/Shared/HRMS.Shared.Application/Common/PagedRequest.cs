using HRMS.Core.Postgres.Common;
namespace HRMS.Shared.Application.Common
{
    public class PagedRequest
    {
        public PageCriteria? PageCriteria { get; set; } = new PageCriteria();
        public OrderByCriteria? OrderByCriteria { get; set; } = new OrderByCriteria();
    }

    public class PagedResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
