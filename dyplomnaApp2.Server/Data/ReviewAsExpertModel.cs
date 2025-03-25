namespace dyplomnaApp2.Server.Data
{
    public class ReviewAsExpertModel
    {
        public Guid ReviewId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ReviewText { get; set; }
        public int Rating { get; set; }
        public int AdId { get; set; }
        public string AuthorEmployerId { get; set; }
        //public ProfileModel? UserEmployerId { get; set; }
    }
}
