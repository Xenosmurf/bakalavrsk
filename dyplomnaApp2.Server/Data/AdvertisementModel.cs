using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace dyplomnaApp2.Server.Data
{
    public class AdvertisementModel
    {

            public int AdId { get; set; }

            public ProfileModel? UserId { get; set; }
            public string AuthorId { get; set; }

            public string? Title { get; set; }

            public string? DescriptionAd { get; set; }

            public int? Payment { get; set; }

            public DateTime? CreatedAt { get; set; }

            public string? Deadline { get; set; }

            public string? StatusAd { get; set; }
            public string? ExpertId { get; set; }

            public Guid? CategoryId { get; set; }

            [NotMapped]
            public ICollection<AdImages>? ExpertIds { get; set; }
    }
}
