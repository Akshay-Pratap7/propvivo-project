using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using DocumentsFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace DocumentsFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class DocumentMutation
    {
        public async Task<BaseResponse<CreateDocumentResponse>> CreateDocumentAsync(
            CreateDocumentRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<UpdateDocumentResponse>> UpdateDocumentAsync(
            UpdateDocumentRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        public async Task<BaseResponse<DeleteDocumentResponse>> DeleteDocumentAsync(
            DeleteDocumentRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
