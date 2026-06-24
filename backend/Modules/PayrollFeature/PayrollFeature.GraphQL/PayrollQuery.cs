using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using PayrollFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace PayrollFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class PayrollQuery
    {
        public async Task<BaseResponsePagination<GetAllPayrollsResponse>> GetAllPayrollsAsync(
            GetAllPayrollsRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
