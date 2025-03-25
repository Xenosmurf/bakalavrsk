namespace dyplomnaApp2.Server.Data
{
    public class RelationsModel
    {
        public RelationsModel( string firstProfileId, string secondProfileId)
        {
            FirstProfileId = firstProfileId;
            SecondProfileId = secondProfileId;
        }

        public Guid RelationsId { get; set; }
        public string FirstProfileId { get; set;}
        public string SecondProfileId { get; set;}
    }
}
