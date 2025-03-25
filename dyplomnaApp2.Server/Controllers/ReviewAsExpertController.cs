using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("reviewExp")]
    [ApiController]
    public class ReviewAsExpertController : ControllerBase
    {
        private readonly AppDBContext _context;
        public ReviewAsExpertController(AppDBContext context)
        {
            _context = context;
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetReviewsWithUsernameByUserId(string userId)
        {
            try
            {
                // Find all AdvertisementModel entries for the specified UserId
                var advertisements = await _context.Advertisement
                    .Where(a => a.ExpertId == userId)
                    .ToListAsync();

                // Extract the AdId values from the advertisements
                var adIds = advertisements.Select(a => a.AdId).ToList();

                // Find all ReviewAsEmployerModel entries where AdId is in the list of adIds
                var reviews = await _context.ReviewAsExpert
                    .Where(r => adIds.Contains(r.AdId))
                    .Select(r => new
                    {
                        ReviewId = r.ReviewId,
                        CreatedAt = r.CreatedAt,
                        ReviewText = r.ReviewText,
                        Rating = r.Rating,
                        AdId = r.AdId,
                        AuthorExpertId = r.AuthorEmployerId,
                        Username = _context.Profile
                            .Where(p => p.UserId == r.AuthorEmployerId)
                            .Select(p => p.Username)
                            .FirstOrDefault() // Retrieve the first username found
                    })
                    .ToListAsync();

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to retrieve reviews with usernames for the user");
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateReviewAsExpert([FromBody] ReviewAsExpertModel review)
        {
            try
            {
                // Add the review to the context
                _context.ReviewAsExpert.Add(review);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok("Review created successfully");
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Failed to create review");
            }
        }

    }
}
