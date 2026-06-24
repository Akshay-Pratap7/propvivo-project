using HRMS.Shared.Application.Common;
using System;

namespace TrainingFeature.Application.DTO
{
    public class TrainingModuleDto
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? ContentUrl { get; set; }
        public bool IsMandatory { get; set; }
    }

    public partial class CreateTrainingModuleRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? ContentUrl { get; set; }
        public bool IsMandatory { get; set; }
    }

    public partial class GetAllTrainingModulesRequest : PagedRequest { }
}
