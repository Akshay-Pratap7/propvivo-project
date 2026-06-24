using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using AnnouncementsFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace AnnouncementsFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class AnnouncementMutation
    {
        public async Task<AnnouncementDto> CreateAnnouncement(
            CreateAnnouncementRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
