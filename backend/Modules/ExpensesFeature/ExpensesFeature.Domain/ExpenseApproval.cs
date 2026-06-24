using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace ExpensesFeature.Domain
{
    public class ExpenseApproval : BaseEntity
    {
        public string? ExpenseId { get; set; }
        public string? ApproverId { get; set; }
        public int Level { get; set; }
        public string? Status { get; set; }
        public string? Comments { get; set; }
    }
}
