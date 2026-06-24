using AutoMapper;
using LeaveFeature.Domain;

namespace LeaveFeature.Application.DTO
{
    public class CreateLeaveMapper : Profile
    {
        public CreateLeaveMapper()
        {
            CreateMap<CreateLeaveDto, LeaveRequest>()
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => nameof(LeaveRequest)))
                .ForMember(dest => dest.ModifiedOn, opt => opt.MapFrom(src => DateTime.UtcNow));
        }
    }

    public class UpdateLeaveMapper : Profile
    {
        public UpdateLeaveMapper()
        {
            CreateMap<UpdateLeaveDto, LeaveRequest>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.LeaveId))
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => nameof(LeaveRequest)))
                .ForMember(dest => dest.ModifiedOn, opt => opt.MapFrom(src => DateTime.UtcNow));
        }
    }

    public class GetAllLeaveMapper : Profile
    {
        public GetAllLeaveMapper()
        {
            CreateMap<LeaveRequest, GetAllLeavesItem>();
        }
    }
}
