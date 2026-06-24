using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using RecruitmentFeature.Application.DTO;
using HRMS.Shared.Application.Common;
using MediatR;
using System.Threading.Tasks;

namespace RecruitmentFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class RecruitmentQuery
    {
        public async Task<PagedResponse<JobPostingDto>> GetJobPostings(GetAllJobPostingsRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
