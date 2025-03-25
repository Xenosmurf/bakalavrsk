using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("addphotos")]
    [ApiController]
    public class AdImageController : ControllerBase
    {

        private readonly AppDBContext _context;

        public AdImageController(AppDBContext context)
        {
            _context = context;
        }

        [HttpPost("create/adimage")]

        public async Task<IActionResult> CreateAdImage([FromBody] AdImages adImage)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.AdImages.Add(adImage);
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

        [HttpDelete("adimage/{postImageId}")]
        public async Task<IActionResult> DeleteAdImageById(Guid postImageId)
        {
            try
            {
                // Find the advertisement by its ID
                var adImage = await _context.AdImages.FindAsync(postImageId);

                if (adImage == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }

                // Remove the advertisement from the DbSet
                _context.AdImages.Remove(adImage);

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


        [HttpPost("create/postimage")]

        public async Task<IActionResult> CreatePostImage([FromBody] PostImages adImage)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.PostImages.Add(adImage);
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

        [HttpDelete("postimage/{postImageId}")]
        public async Task<IActionResult> DeletePostById(Guid postImageId)
        {
            try
            {
                // Find the advertisement by its ID
                var adImage = await _context.PostImages.FindAsync(postImageId);

                if (adImage == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }

                // Remove the advertisement from the DbSet
                _context.PostImages.Remove(adImage);

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
