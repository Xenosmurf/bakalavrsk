using System.ComponentModel.DataAnnotations.Schema;

namespace dyplomnaApp2.Server.Data
{
    public class PostImages
    {
        public int PostImageId { get; set; }
        public string PostImageUrl { get; set; }
        public int PostId { get; set; }

        //[NotMapped]
        //public PostCardModel PostCard { get; set; }
    }
}
