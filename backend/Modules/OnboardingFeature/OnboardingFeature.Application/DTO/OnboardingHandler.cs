using OnboardingFeature.Application.Repository;
using OnboardingFeature.Domain;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnboardingFeature.Application.DTO
{
    public class CreateOnboardingTaskHandler : IRequestHandler<CreateOnboardingTaskRequest, OnboardingTaskDto>
    {
        private readonly IOnboardingRepository _repository;
        public CreateOnboardingTaskHandler(IOnboardingRepository repository) => _repository = repository;

        public async Task<OnboardingTaskDto> Handle(CreateOnboardingTaskRequest request, CancellationToken cancellationToken)
        {
            var entity = new OnboardingTask
            {
                UserId = request.UserId,
                Phase = request.Phase,
                Title = request.Title,
                IsCompleted = false
            };
            await _repository.AddItemAsync(entity);
            return new OnboardingTaskDto { Id = entity.Id, Title = entity.Title };
        }
    }

    public class GetAllOnboardingTasksHandler : IRequestHandler<GetAllOnboardingTasksRequest, PagedResponse<OnboardingTaskDto>>
    {
        private readonly IOnboardingRepository _repository;
        public GetAllOnboardingTasksHandler(IOnboardingRepository repository) => _repository = repository;

        public async Task<PagedResponse<OnboardingTaskDto>> Handle(GetAllOnboardingTasksRequest request, CancellationToken cancellationToken)
        {
            var (items, count) = await _repository.GetItemsWithCountAsync(x => x.DocumentType == nameof(OnboardingTask), request, x => x.CreatedOn);
            return new PagedResponse<OnboardingTaskDto>(items.Select(x => new OnboardingTaskDto { Id = x.Id, Title = x.Title }).ToList(), count, request.PageCriteria.Skip / request.PageCriteria.PageSize + 1, request.PageCriteria.PageSize);
        }
    }
}

namespace OnboardingFeature.Application.DTO
{
    public partial class CreateOnboardingTaskRequest : IRequest<OnboardingTaskDto> { }
    public partial class GetAllOnboardingTasksRequest : IRequest<PagedResponse<OnboardingTaskDto>> { }
}
