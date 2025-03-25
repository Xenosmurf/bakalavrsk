namespace dyplomnaApp2.Server.Data
{
    public class ProfileModel
    {
        public string UserId { get; set; }
        public string Username { get; set; } = "Name2";
        public string Email { get; set; } 
        //public string Password { get; set; }
        public DateTime Created_at { get; set; }
        public string Description { get; set; } = "";
        public string? AvatarURL { get; set; }
        public int RatingExpert { get; set; } = 0;
        public int RatingEmployer { get; set; } = 0;
        public int NumberReviewExpert { get; set; } = 0;
        public int NumberReviewEmployer { get; set; } = 0;

        public ICollection<AdvertisementModel>? Advertisement { get; set; }
    }
}
