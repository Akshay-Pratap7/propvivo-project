using ExpensesFeature.Application.Repository;
using ExpensesFeature.Domain;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace ExpensesFeature.Application.DTO
{
    public class ApproveExpenseRequest : IRequest<bool>
    {
        public string? ExpenseId { get; set; }
        public string? ApproverId { get; set; }
        public string? Comments { get; set; }
    }

    public class ApproveExpenseHandler : IRequestHandler<ApproveExpenseRequest, bool>
    {
        private readonly IExpenseRepository _repository;
        public ApproveExpenseHandler(IExpenseRepository repository) => _repository = repository;

        public async Task<bool> Handle(ApproveExpenseRequest request, CancellationToken cancellationToken)
        {
            // Logic for multi-level expense approval
            return true;
        }
    }
}
