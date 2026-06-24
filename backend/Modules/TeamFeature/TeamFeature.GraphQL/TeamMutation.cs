using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using TeamFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace TeamFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class TeamMutation
    {
        public async Task<BaseResponse<CreateTeamMemberResponse>> CreateTeamMemberAsync(
            CreateTeamMemberRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<UpdateTeamMemberResponse>> UpdateTeamMemberAsync(
            UpdateTeamMemberRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<DeleteTeamMemberResponse>> DeleteTeamMemberAsync(
            DeleteTeamMemberRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
