using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using ExpensesFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace ExpensesFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class ExpenseQuery
    {
        public async Task<BaseResponsePagination<GetAllExpensesResponse>> GetAllExpensesAsync(
            GetAllExpensesRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
