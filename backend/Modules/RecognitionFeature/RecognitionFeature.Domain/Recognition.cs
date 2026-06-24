using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using System;

namespace RecognitionFeature.Domain
{
    public class Recognition : BaseEntity
    {
        public string? FromUserId { get; set; }
        public string? ToUserId { get; set; }
        public string? Category { get; set; }
        public string? Message { get; set; }
        public string? Visibility { get; set; } // Public, Private
        public int Likes { get; set; } = 0;
    }
}
