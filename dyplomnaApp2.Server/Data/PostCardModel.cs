using System.ComponentModel.DataAnnotations.Schema;

namespace dyplomnaApp2.Server.Data
{
    public class PostCardModel
    {
        public int PostId { get; set; }
        public string PostCardText { get; set; }
        public DateTime CreatedAt {  get; set; }
        public string AuthorPostId { get; set; }
        [NotMapped]
        public ICollection<PostImages>? PostImages { get; set; }
    }
}
