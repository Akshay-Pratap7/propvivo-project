using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Domain.Entity;
using System;

namespace PayrollFeature.Domain
{
    public class PayrollRecord : BaseEntity
    {
        public string? UserId { get; set; }
        public UserBase? UserContext { get; set; }
        public DateTime PayPeriodStart { get; set; }
        public DateTime PayPeriodEnd { get; set; }
        public decimal GrossPay { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal NetPay { get; set; }
        public string? Currency { get; set; }
        public string? CountryCode { get; set; } // e.g., "US", "IN"
        public string? Status { get; set; } // draft, processing, approved, paid
        public string? PayslipUrl { get; set; }

        // Earnings
        public decimal BasicSalary { get; set; }
        public decimal HRA { get; set; }
        public decimal SpecialAllowance { get; set; }
        public decimal Bonus { get; set; }
        public decimal OvertimePay { get; set; }
        public decimal Reimbursements { get; set; }

        // Deductions
        public decimal PF { get; set; } // Provident Fund
        public decimal IncomeTax { get; set; }
        public decimal ProfessionalTax { get; set; }
        public decimal ESI { get; set; } // Employee State Insurance
        public decimal HealthInsurance { get; set; }
        public decimal LWF { get; set; } // Labour Welfare Fund
        public decimal OtherDeductions { get; set; }

        // Employer Contributions (for record-keeping, not deducted from employee)
        public decimal EmployerPF { get; set; }
        public decimal EmployerESI { get; set; }
        public decimal Gratuity { get; set; }
    }
}
