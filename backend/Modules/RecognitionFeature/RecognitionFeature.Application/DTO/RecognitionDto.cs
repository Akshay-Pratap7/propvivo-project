using HRMS.Shared.Application.Common;
using System;

namespace RecognitionFeature.Application.DTO
{
    public class RecognitionDto
    {
        public string? Id { get; set; }
        public string? GiverId { get; set; }
        public string? ReceiverId { get; set; }
        public string? Message { get; set; }
        public string? Category { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public partial class CreateRecognitionRequest
    {
        public string? ReceiverId { get; set; }
        public string? Message { get; set; }
        public string? Category { get; set; }
    }

    public partial class GetAllRecognitionsRequest : PagedRequest { }
}
