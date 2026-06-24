using AnnouncementsFeature.Application.Repository;
using AnnouncementsFeature.Domain;
using HRMS.Shared.Application.Common;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AnnouncementsFeature.Application.DTO
{
    public class CreateAnnouncementHandler : IRequestHandler<CreateAnnouncementRequest, AnnouncementDto>
    {
        private readonly IAnnouncementRepository _repository;

        public CreateAnnouncementHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<AnnouncementDto> Handle(CreateAnnouncementRequest request, CancellationToken cancellationToken)
        {
            var entity = new Announcement
            {
                Title = request.Title,
                Content = request.Content,
                Category = request.Category,
                Priority = request.Priority,
                Scope = request.Scope,
                TargetId = request.TargetId,
                PostedDate = DateTime.UtcNow,
                ExpiryDate = request.ExpiryDate,
                IsActive = true
            };

            await _repository.AddItemAsync(entity);
            return entity.ToDto();
        }
    }

    public class GetAllAnnouncementsHandler : IRequestHandler<GetAllAnnouncementsRequest, PagedResponse<AnnouncementDto>>
    {
        private readonly IAnnouncementRepository _repository;

        public GetAllAnnouncementsHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<PagedResponse<AnnouncementDto>> Handle(GetAllAnnouncementsRequest request, CancellationToken cancellationToken)
        {
            var (items, count) = await _repository.GetAllAnnouncementsWithCountAsync(request);
            return new PagedResponse<AnnouncementDto>(items.Select(x => x.ToDto()).ToList(), count, request.PageCriteria.Skip / request.PageCriteria.PageSize + 1, request.PageCriteria.PageSize);
        }
    }
}

// Add markers for MediatR
namespace AnnouncementsFeature.Application.DTO
{
    public partial class CreateAnnouncementRequest : IRequest<AnnouncementDto> { }
    public partial class GetAllAnnouncementsRequest : IRequest<PagedResponse<AnnouncementDto>> { }
}
