using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("categoryprofile")]
    [ApiController]
    public class CategoryProfileController : ControllerBase
    {
        private readonly AppDBContext _context;
        public CategoryProfileController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCategoriesByUserId(string userId)
        {
            try
            {
                //var categories = await _context.CategoryProfile
                //    .Where(c => c.ProfileId == userId)
                //    .ToListAsync();

                var categories = await(from cp in _context.CategoryProfile
                                       join c in _context.Category on cp.CategoryId equals c.CategoryId
                                       where cp.ProfileId == userId
                                       select new
                                       {
                                           cp.CategoryId,
                                           cp.CategoryProfileId,
                                           cp.ProfileId,
                                           CategoryName = c.CategoryName

                                       }).ToListAsync();
                                       

                return Ok(categories);

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("profilesbycategory/{categoryId}")]
        public async Task<IActionResult> GetProfilesByCategoryId(Guid categoryId, string excludeUserId)
        {
            try
            {
                var profiles = await (from cp in _context.CategoryProfile
                                      join p in _context.Profile on cp.ProfileId equals p.UserId
                                      where cp.CategoryId == categoryId && p.UserId != excludeUserId
                                      select new
                                      {
                                          p.UserId,
                                          p.Username,
                                          p.Email,
                                          p.Created_at,
                                          p.Description,
                                          p.AvatarURL,
                                          p.RatingExpert,
                                          p.RatingEmployer,
                                          p.NumberReviewExpert,
                                          p.NumberReviewEmployer,
                                      }).ToListAsync();

                return Ok(profiles);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to get profiles by category: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategoryProfile([FromBody] CategoryProfile categoryProfile)
        {
            try
            {
                _context.CategoryProfile.Add(categoryProfile);
                await _context.SaveChangesAsync();

                var categoryProfileId = categoryProfile.CategoryProfileId;

                return Ok(new { categoryProfileId });

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to create profiles by category: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteCategoryProfile(Guid categoryProfileId)
        {
            try
            {
                var catProf = await _context.CategoryProfile.FindAsync(categoryProfileId);

                if (catProf == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }

                // Remove the advertisement from the DbSet
                _context.CategoryProfile.Remove(catProf);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok("Advertisement deleted successfully");
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Failed to create profiles by category: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
