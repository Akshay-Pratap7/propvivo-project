using HRMS.Core.Postgres.Common;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace AttendanceFeature.Application.DTO
{
    public interface IAttendanceIdDto
    {
        string? AttendanceId { get; set; }
    }

    public interface IAttendancePayloadDto
    {
        string? EmployeeId { get; set; }
        DateTime Date { get; set; }
        DateTime? ClockInTime { get; set; }
        DateTime? ClockOutTime { get; set; }
        double? ClockInLatitude { get; set; }
        double? ClockInLongitude { get; set; }
        double? ClockOutLatitude { get; set; }
        double? ClockOutLongitude { get; set; }
        string? ClockInIP { get; set; }
        string? ClockOutIP { get; set; }
        string? ClockInSelfieUrl { get; set; }
        string? Status { get; set; }
    }

    public class CreateAttendanceDto : IAttendancePayloadDto
    {
        public string? EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public double? ClockInLatitude { get; set; }
        public double? ClockInLongitude { get; set; }
        public double? ClockOutLatitude { get; set; }
        public double? ClockOutLongitude { get; set; }
        public string? ClockInIP { get; set; }
        public string? ClockOutIP { get; set; }
        public string? ClockInSelfieUrl { get; set; }
        public string? Status { get; set; }
    }

    public class UpdateAttendanceDto : IAttendanceIdDto, IAttendancePayloadDto
    {
        public string? AttendanceId { get; set; }
        public string? EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public double? ClockInLatitude { get; set; }
        public double? ClockInLongitude { get; set; }
        public double? ClockOutLatitude { get; set; }
        public double? ClockOutLongitude { get; set; }
        public string? ClockInIP { get; set; }
        public string? ClockOutIP { get; set; }
        public string? ClockInSelfieUrl { get; set; }
        public string? Status { get; set; }
    }

    public class DeleteAttendanceDto : IAttendanceIdDto
    {
        public string? AttendanceId { get; set; }
    }

    public class GetAllAttendanceDto
    {
        public string? AttendanceId { get; set; }
        public string? EmployeeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Status { get; set; }
    }

    public class CreateAttendanceRequest : ExecutionRequest, IRequest<BaseResponse<CreateAttendanceResponse>>
    {
        public CreateAttendanceDto? RequestParam { get; set; }
    }

    public class UpdateAttendanceRequest : ExecutionRequest, IRequest<BaseResponse<UpdateAttendanceResponse>>
    {
        public UpdateAttendanceDto? RequestParam { get; set; }
    }

    public class DeleteAttendanceRequest : ExecutionRequest, IRequest<BaseResponse<DeleteAttendanceResponse>>
    {
        public DeleteAttendanceDto? RequestParam { get; set; }
    }

    public class GetAllAttendanceRequest : Request, IRequest<BaseResponsePagination<GetAllAttendanceResponse>>
    {
        public GetAllAttendanceDto? RequestParam { get; set; }
    }
}
