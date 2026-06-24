using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using TeamFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace TeamFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class TeamQuery
    {
        public async Task<BaseResponsePagination<GetAllTeamMembersResponse>> GetAllTeamMembersAsync(
            GetAllTeamMembersRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
