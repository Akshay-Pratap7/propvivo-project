using HRMS.Core.Postgres.Common;
namespace ContributionsFeature.Domain
{
    public class ContributionItem : BaseEntity
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PointsRange { get; set; }
    }
}
