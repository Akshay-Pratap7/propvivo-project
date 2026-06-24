using AnnouncementsFeature.Domain;

namespace AnnouncementsFeature.Application.DTO
{
    public static class AnnouncementMapper
    {
        public static AnnouncementDto ToDto(this Announcement entity)
        {
            return new AnnouncementDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Content = entity.Content,
                Category = entity.Category,
                Priority = entity.Priority,
                Scope = entity.Scope,
                TargetId = entity.TargetId,
                PostedDate = entity.PostedDate,
                ExpiryDate = entity.ExpiryDate,
                IsActive = entity.IsActive,
                Views = entity.Views,
                Likes = entity.Likes,
                CreatedOn = entity.CreatedOn,
                CreatedByUserName = entity.CreatedByUserName
            };
        }
    }
}
