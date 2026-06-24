using HRMS.Shared.Application.DTOs;
using MediatR;

namespace DocumentsFeature.Application.DTO
{
    public class DocumentDto
    {
        public string? DocumentId { get; set; }
        public string? Category { get; set; }
        public string? FileName { get; set; }
        public string? FileUrl { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? Status { get; set; }
        public string? RejectionReason { get; set; }
        public string? UserId { get; set; }
        public string? Keyword { get; set; }
    }

    public class CreateDocumentRequest : IRequest<BaseResponse<CreateDocumentResponse>>
    {
        public DocumentDto? RequestParam { get; set; }
    }

    public class CreateDocumentResponse
    {
        public string? DocumentId { get; set; }
    }

    public class GetAllDocumentsRequest : BaseRequestPagination, IRequest<BaseResponsePagination<GetAllDocumentsResponse>>
    {
        public DocumentDto? RequestParam { get; set; }
    }

    public class GetAllDocumentsResponse
    {
        public List<DocumentDto>? Documents { get; set; }
    }

    public class UpdateDocumentRequest : IRequest<BaseResponse<UpdateDocumentResponse>>
    {
        public DocumentDto? RequestParam { get; set; }
    }

    public class UpdateDocumentResponse
    {
        public string? DocumentId { get; set; }
    }

    public class DeleteDocumentRequest : IRequest<BaseResponse<DeleteDocumentResponse>>
    {
        public DocumentDto? RequestParam { get; set; }
    }

    public class DeleteDocumentResponse
    {
        public string? DocumentId { get; set; }
    }
}
