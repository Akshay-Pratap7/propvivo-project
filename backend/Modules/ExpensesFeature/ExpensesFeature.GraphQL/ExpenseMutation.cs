using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using ExpensesFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace ExpensesFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class ExpenseMutation
    {
        public async Task<BaseResponse<CreateExpenseResponse>> CreateExpenseAsync(
            CreateExpenseRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<UpdateExpenseResponse>> UpdateExpenseAsync(
            UpdateExpenseRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<DeleteExpenseResponse>> DeleteExpenseAsync(
            DeleteExpenseRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
