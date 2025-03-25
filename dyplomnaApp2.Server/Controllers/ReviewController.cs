using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("review")]
    [ApiController]
    public class ReviewController : ControllerBase
    {

        private readonly AppDBContext _context;
        public ReviewController(AppDBContext context)
        {
            _context = context;
        }

        //[HttpGet("expert/{expertId}")]
        //public async Task<IActionResult> GetAllReviewAsExpert(string expertId)
        //{
        //    try
        //    {
        //        var adsWithProfileInfo = await (from ad in _context.Advertisement
        //                                        join profile in _context.Profile
        //                                        on ad.ExpertId equals profile.UserId into joinedData
        //                                        from profile in joinedData.DefaultIfEmpty()
        //                                        where ad.ExpertId == expertId
        //                                        //where profile.UserId == authorId
        //                                        select new
        //                                        {
        //                                            ad.AdId,
        //                                            ad.Title,
        //                                            ad.DescriptionAd,
        //                                            ad.Payment,
        //                                            ad.CreatedAt,
        //                                            ad.Deadline,
        //                                            ad.StatusAd,
        //                                            ad.ExpertId,
        //                                            AuthorAvatarUrl = profile != null ? profile.AvatarURL : null,
        //                                            AuthorUsername = profile != null ? profile.Username : null
        //                                            //AuthorRatingExpert = profile.RatingExpert,
        //                                            //AuthorRatingEmplyer = profile.RatingEmployer,
        //                                            //AuthorNumberReviewEmplyer = profile.NumberReviewEmployer,
        //                                            //Author
        //                                        }).ToListAsync();

        //        return Ok(adsWithProfileInfo);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log or handle the exception
        //        Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
        //        return StatusCode(500, "Internal server error");
        //    }
        //}
    }
}
