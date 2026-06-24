using AutoMapper;
using UserFeature.Domain;

namespace UserFeature.Application.DTO
{
    public class CreateEmployeeMapper : Profile
    {
        public CreateEmployeeMapper()
        {
            CreateMap<CreateEmployeeDto, Employee>()
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => nameof(Employee)))
                .ForMember(dest => dest.ModifiedOn, opt => opt.MapFrom(src => DateTime.UtcNow));
        }
    }

    public class UpdateEmployeeMapper : Profile
    {
        public UpdateEmployeeMapper()
        {
            CreateMap<UpdateEmployeeDto, Employee>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.EmployeeId))
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => nameof(Employee)))
                .ForMember(dest => dest.ModifiedOn, opt => opt.MapFrom(src => DateTime.UtcNow));
        }
    }

    public class GetAllEmployeeMapper : Profile
    {
        public GetAllEmployeeMapper()
        {
            CreateMap<Employee, GetAllEmployeesItem>();
        }
    }
}
