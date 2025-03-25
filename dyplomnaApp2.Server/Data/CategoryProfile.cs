using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dyplomnaApp2.Server.Data
{
    public class CategoryProfile
    {
        public Guid CategoryProfileId { get; set; }
        public Guid CategoryId { get; set; }
        public string ProfileId { get; set; }
    }
}
