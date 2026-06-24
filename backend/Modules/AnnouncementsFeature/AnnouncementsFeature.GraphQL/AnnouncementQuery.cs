using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using AnnouncementsFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace AnnouncementsFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class AnnouncementQuery
    {
        public async Task<PagedResponse<AnnouncementDto>> GetAnnouncements(
            GetAllAnnouncementsRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
