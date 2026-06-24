using RecruitmentFeature.Application.Repository;
using RecruitmentFeature.Domain;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RecruitmentFeature.Application.DTO
{
    public class CreateJobPostingHandler : IRequestHandler<CreateJobPostingRequest, JobPostingDto>
    {
        private readonly IRecruitmentRepository _repository;
        public CreateJobPostingHandler(IRecruitmentRepository repository) => _repository = repository;

        public async Task<JobPostingDto> Handle(CreateJobPostingRequest request, CancellationToken cancellationToken)
        {
            var entity = new JobPosting
            {
                Title = request.Title,
                Description = request.Description,
                Department = request.Department,
                Location = request.Location,
                Status = "Open"
            };
            await _repository.AddItemAsync(entity);
            return new JobPostingDto { Id = entity.Id, Title = entity.Title };
        }
    }

    public class GetAllJobPostingsHandler : IRequestHandler<GetAllJobPostingsRequest, PagedResponse<JobPostingDto>>
    {
        private readonly IRecruitmentRepository _repository;
        public GetAllJobPostingsHandler(IRecruitmentRepository repository) => _repository = repository;

        public async Task<PagedResponse<JobPostingDto>> Handle(GetAllJobPostingsRequest request, CancellationToken cancellationToken)
        {
            var (items, count) = await _repository.GetItemsWithCountAsync(x => x.DocumentType == nameof(JobPosting), request, x => x.CreatedOn);
            return new PagedResponse<JobPostingDto>(items.Select(x => new JobPostingDto { Id = x.Id, Title = x.Title }).ToList(), count, request.PageCriteria.Skip / request.PageCriteria.PageSize + 1, request.PageCriteria.PageSize);
        }
    }
}

namespace RecruitmentFeature.Application.DTO
{
    public partial class CreateJobPostingRequest : IRequest<JobPostingDto> { }
    public partial class GetAllJobPostingsRequest : IRequest<PagedResponse<JobPostingDto>> { }
}
