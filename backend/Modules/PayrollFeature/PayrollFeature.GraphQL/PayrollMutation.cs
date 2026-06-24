using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using PayrollFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace PayrollFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class PayrollMutation
    {
        public async Task<BaseResponse<CreatePayrollResponse>> CreatePayrollAsync(
            CreatePayrollRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<UpdatePayrollResponse>> UpdatePayrollAsync(
            UpdatePayrollRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<DeletePayrollResponse>> DeletePayrollAsync(
            DeletePayrollRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
