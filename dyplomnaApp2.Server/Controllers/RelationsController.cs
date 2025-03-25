using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("relations")]
    [ApiController]
    public class RelationsController : ControllerBase
    {
        private readonly AppDBContext _context;
        public RelationsController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet("exists")]
        public async Task<IActionResult> CheckRelationExists(string firstProfileId, string secondProfileId)
        {
            try
            {
                var relationExists = await _context.Relations
                    .Where(r =>
                        (r.FirstProfileId == firstProfileId && r.SecondProfileId == secondProfileId) ||
                        (r.FirstProfileId == secondProfileId && r.SecondProfileId == firstProfileId)
                    )
                    .Select(r => new
                    {
                        r.RelationsId
                    })
                    .ToListAsync();
                Console.WriteLine("RELATION EXISTS:++++++++++++++++++++++++++++++++++++++++", relationExists);

                return Ok(relationExists);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRelations(RelationsModel model)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.Relations.Add(model);
                await _context.SaveChangesAsync();

                var relationsId = model.RelationsId;

                return Ok(new { relationsId });
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to create advertisement");
            }
        }
    }
}
