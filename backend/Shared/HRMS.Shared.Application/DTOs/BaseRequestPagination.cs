using HRMS.Core.Postgres.Common;
namespace HRMS.Shared.Application.DTOs
{
    public class BaseRequestPagination
    {
        public PageCriteria? PageCriteria { get; set; } = new PageCriteria();
        public OrderByCriteria? OrderByCriteria { get; set; } = new OrderByCriteria();
    }
}
