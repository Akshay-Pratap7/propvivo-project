using PerformanceFeature.Application.Repository;
using PerformanceFeature.Domain;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace PerformanceFeature.Application.DTO
{
    public class CreateGoalHandler : IRequestHandler<CreateGoalRequest, GoalDto>
    {
        private readonly IPerformanceRepository _repository;
        public CreateGoalHandler(IPerformanceRepository repository) => _repository = repository;

        public async Task<GoalDto> Handle(CreateGoalRequest request, CancellationToken cancellationToken)
        {
            var entity = new Goal
            {
                UserId = request.UserId,
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Weight = request.Weight,
                TargetValue = request.TargetValue,
                CurrentValue = 0,
                Status = "NotStarted",
                StartDate = request.StartDate,
                EndDate = request.EndDate
            };
            await _repository.AddItemAsync(entity);
            return new GoalDto { Id = entity.Id, Title = entity.Title };
        }
    }

    public class GetAllGoalsHandler : IRequestHandler<GetAllGoalsRequest, PagedResponse<GoalDto>>
    {
        private readonly IPerformanceRepository _repository;
        public GetAllGoalsHandler(IPerformanceRepository repository) => _repository = repository;

        public async Task<PagedResponse<GoalDto>> Handle(GetAllGoalsRequest request, CancellationToken cancellationToken)
        {
            var (items, count) = await _repository.GetItemsWithCountAsync(x => x.DocumentType == nameof(Goal), request, x => x.CreatedOn);
            return new PagedResponse<GoalDto>(items.Select(x => new GoalDto { Id = x.Id, Title = x.Title }).ToList(), count, request.PageCriteria.Skip / request.PageCriteria.PageSize + 1, request.PageCriteria.PageSize);
        }
    }
}

namespace PerformanceFeature.Application.DTO
{
    public partial class CreateGoalRequest : IRequest<GoalDto> { }
    public partial class GetAllGoalsRequest : IRequest<PagedResponse<GoalDto>> { }
}
