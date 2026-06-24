using HotChocolate.Types;
using HotChocolate;
using HotChocolate;
using DocumentsFeature.Application.DTO;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace DocumentsFeature.GraphQL
{
    [ExtendObjectType("Query")]
    public class DocumentQuery
    {
        public async Task<BaseResponsePagination<GetAllDocumentsResponse>> GetAllDocumentsAsync(
            GetAllDocumentsRequest request,
            [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }
    }
}
