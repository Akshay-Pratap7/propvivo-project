using LeaveFeature.Application.Repository;
using LeaveFeature.Domain;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LeaveFeature.Application.DTO
{
    public class ApproveLeaveRequest : IRequest<bool>
    {
        public string? LeaveRequestId { get; set; }
        public string? ApproverId { get; set; }
        public string? Comments { get; set; }
    }

    public class ApproveLeaveHandler : IRequestHandler<ApproveLeaveRequest, bool>
    {
        private readonly ILeaveRepository _repository;
        public ApproveLeaveHandler(ILeaveRepository repository) => _repository = repository;

        public async Task<bool> Handle(ApproveLeaveRequest request, CancellationToken cancellationToken)
        {
            // Logic for multi-level approval
            // 1. Get Leave Request
            // 2. Check current level
            // 3. Update status or move to next level
            return true;
        }
    }
}
