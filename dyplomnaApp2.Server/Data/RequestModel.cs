namespace dyplomnaApp2.Server.Data
{
    public class RequestModel
    {
        public Guid RequestId { get; set; }
        public string RequestText { get; set; }
        public string ReceiverId { get; set; }
        public int AdId { get; set; }
        public string? ApplicantId { get; set; }
        public bool Seen { get; set; }
        public bool? Approved { get; set; }
        public bool? JobOffer { get; set;}

        public DateTime CreatedAt { get; set; }
    }
}
