using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
namespace HRMS.Shared.Application.Common
{
    public class PagedRequest : Request
    {
    }

    public class PagedResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PagedResponse() { }

        public PagedResponse(List<T> items, int count, int pageNumber, int pageSize)
        {
            Items = items;
            TotalCount = count;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}
