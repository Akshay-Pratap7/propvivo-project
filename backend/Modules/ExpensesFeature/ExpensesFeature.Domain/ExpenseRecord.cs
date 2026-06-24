using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;
using System;

namespace ExpensesFeature.Domain
{
    public class ExpenseRecord : BaseEntity
    {
        public string? UserId { get; set; }
        public UserBase? UserContext { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string? Category { get; set; } // e.g., Travel, Food, Accommodation
        public decimal Amount { get; set; }
        public string? Currency { get; set; }
        public string? Description { get; set; }
        public string? ReceiptUrl { get; set; }
        public string? Status { get; set; } // draft, submitted, pending-approval, approved, rejected, paid
        public string? ApprovedByUserId { get; set; }
        public string? RejectionReason { get; set; }
    }
}
