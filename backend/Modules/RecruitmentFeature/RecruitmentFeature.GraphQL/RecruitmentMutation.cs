using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using RecruitmentFeature.Application.DTO;
using MediatR;
using System.Threading.Tasks;

namespace RecruitmentFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class RecruitmentMutation
    {
        public async Task<JobPostingDto> CreateJobPosting(CreateJobPostingRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
