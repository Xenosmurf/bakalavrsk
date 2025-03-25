using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly AppDBContext _context;

        public PortfolioController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetPortfolioByUserId(string userId)
        {
            try
            {
                var images = await _context.PortfolioImage
                    .Where(img => img.UserPortfolioId == userId)
                    .ToListAsync();

                return Ok(images);

            }
            catch(Exception ex)
            {
                Console.WriteLine($"Failed to get advertisements: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePortfolioImage([FromBody] PortfolioImageModel portfolioImage)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.PortfolioImage.Add(portfolioImage);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Failed to create advertisement");
            }
        }

        [HttpDelete("{portfolioImageId}")]
        public async Task<IActionResult> DeletePostById(Guid portfolioImageId)
        {
            try
            {
                // Find the advertisement by its ID
                var post = await _context.PortfolioImage.FindAsync(portfolioImageId);

                if (post == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }

                // Remove the advertisement from the DbSet
                _context.PortfolioImage.Remove(post);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
