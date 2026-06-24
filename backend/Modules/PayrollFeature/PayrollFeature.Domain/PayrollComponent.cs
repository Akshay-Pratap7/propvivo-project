using HRMS.Core.Postgres.Common;
namespace PayrollFeature.Domain
{
    public class PayrollComponent : BaseEntity
    {
        public string? PayrollRecordId { get; set; }
        public string? Name { get; set; }
        public decimal Amount { get; set; }
        public string? Type { get; set; } // Earning, Deduction, EmployerContribution
    }
}
