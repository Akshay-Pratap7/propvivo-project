using AutoMapper;
using HRMS.Core.Telemetry.Exceptions;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;
using DocumentsFeature.Application.Repository;
using DocumentsFeature.Domain;

namespace DocumentsFeature.Application.DTO
{
    public class CreateDocumentHandler : IRequestHandler<CreateDocumentRequest, BaseResponse<CreateDocumentResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IDocumentRepository _documentRepository;

        public CreateDocumentHandler(IMapper mapper, IDocumentRepository documentRepository)
        {
            _mapper = mapper;
            _documentRepository = documentRepository;
        }

        public async Task<BaseResponse<CreateDocumentResponse>> Handle(CreateDocumentRequest request, CancellationToken cancellationToken)
        {
            if (request == null || request.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponse<CreateDocumentResponse>();
            var document = _mapper.Map<EmployeeDocument>(request.RequestParam);
            document = await _documentRepository.AddItemAsync(document);

            if (document != null)
            {
                response.Data = new CreateDocumentResponse { DocumentId = document.Id };
                response.StatusCode = StatusCodes.Status200OK;
                response.Message = string.Format(Messaging.Insert, nameof(EmployeeDocument));
                response.Success = true;
            }

            return response;
        }
    }

    public sealed class GetAllDocumentsHandler : IRequestHandler<GetAllDocumentsRequest, BaseResponsePagination<GetAllDocumentsResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IDocumentRepository _documentRepository;

        public GetAllDocumentsHandler(IDocumentRepository documentRepository, IMapper mapper)
        {
            _mapper = mapper;
            _documentRepository = documentRepository;
        }

        public async Task<BaseResponsePagination<GetAllDocumentsResponse>> Handle(GetAllDocumentsRequest request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllDocumentsResponse>();
            (var documents, int count) = await _documentRepository.GetAllDocumentsWithCountAsync(request);

            if (documents != null && documents.Any())
            {
                var data = _mapper.Map<IReadOnlyList<EmployeeDocument>, IReadOnlyList<DocumentDto>>(documents.ToList());
                response.Data = new GetAllDocumentsResponse { Documents = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                {
                    response.Meta = new Meta
                    {
                        Skip = request.PageCriteria.Skip,
                        Take = request.PageCriteria.PageSize,
                        TotalCount = count
                    };
                }
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }

    public sealed class UpdateDocumentHandler : IRequestHandler<UpdateDocumentRequest, BaseResponse<UpdateDocumentResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IDocumentRepository _documentRepository;

        public UpdateDocumentHandler(IMapper mapper, IDocumentRepository documentRepository)
        {
            _mapper = mapper;
            _documentRepository = documentRepository;
        }

        public async Task<BaseResponse<UpdateDocumentResponse>> Handle(UpdateDocumentRequest request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _documentRepository.GetDocumentAsync(new GetAllDocumentsRequest
            {
                RequestParam = new DocumentDto { DocumentId = request.RequestParam.DocumentId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(EmployeeDocument)));

            var document = _mapper.Map<EmployeeDocument>(request.RequestParam);
            document.UserContext = existing.UserContext;
            document.CreatedOn = existing.CreatedOn;
            document.CreatedByUserId = existing.CreatedByUserId;
            document.CreatedByUserName = existing.CreatedByUserName;

            await _documentRepository.UpdateItemAsync(existing.Id, document);

            return new BaseResponse<UpdateDocumentResponse>
            {
                Data = new UpdateDocumentResponse { DocumentId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Update, nameof(EmployeeDocument)),
                Success = true
            };
        }
    }

    public sealed class DeleteDocumentHandler : IRequestHandler<DeleteDocumentRequest, BaseResponse<DeleteDocumentResponse>>
    {
        private readonly IDocumentRepository _documentRepository;

        public DeleteDocumentHandler(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public async Task<BaseResponse<DeleteDocumentResponse>> Handle(DeleteDocumentRequest request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _documentRepository.GetDocumentAsync(new GetAllDocumentsRequest
            {
                RequestParam = new DocumentDto { DocumentId = request.RequestParam.DocumentId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(EmployeeDocument)));

            await _documentRepository.DeleteItemAsync(existing.Id);

            return new BaseResponse<DeleteDocumentResponse>
            {
                Data = new DeleteDocumentResponse { DocumentId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Delete, nameof(EmployeeDocument)),
                Success = true
            };
        }
    }
}
