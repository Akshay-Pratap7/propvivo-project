using AutoMapper;
using DocumentsFeature.Domain;

namespace DocumentsFeature.Application.DTO
{
    public class DocumentMapper : Profile
    {
        public DocumentMapper()
        {
            CreateMap<DocumentDto, EmployeeDocument>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.DocumentId))
                .ReverseMap()
                .ForMember(dest => dest.DocumentId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
