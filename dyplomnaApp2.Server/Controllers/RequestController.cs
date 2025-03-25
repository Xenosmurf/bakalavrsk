using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("request")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly AppDBContext _context;
        public RequestController(AppDBContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRequest([FromBody] RequestModel model)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.Request.Add(model);
                await _context.SaveChangesAsync();

                var requestId = model.RequestId;

                return Ok(new { requestId });
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to create advertisement");
            }
        }

        [HttpGet("unseen")]
        public async Task<IActionResult> GetUnseenRequestsByUserId(string receiverId)
        {
            try
            {
                // Assuming your DbContext is named _context
               var requests = await _context.Request
                    .Where(r => r.ReceiverId == receiverId && r.Seen == false)
                     .Select(r => new
                     {
                         r.RequestId,
                         r.RequestText,
                         r.ReceiverId,
                         r.AdId,
                         r.ApplicantId,
                         r.Seen,
                         r.Approved,
                         r.JobOffer,
                         r.CreatedAt
                     })
                    .ToListAsync();

                return Ok(requests);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to create advertisement");
            }
        }

        [HttpGet("seen")]
        public async Task<IActionResult> GetSeenRequestsByUserId(string receiverId)
        {
            try
            {
                // Assuming your DbContext is named _context
                var requests = await _context.Request
                     .Where(r => r.ReceiverId == receiverId && r.Seen == true)
                      .Select(r => new
                      {
                          r.RequestId,
                          r.RequestText,
                          r.ReceiverId,
                          r.AdId,
                          r.ApplicantId,
                          r.Seen,
                          r.Approved,
                          r.JobOffer,
                          r.CreatedAt
                      })
                     .ToListAsync();

                return Ok(requests);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to create advertisement");
            }
        }

        [HttpPut("update-approve/{requestId}")]
        public async Task<IActionResult> UpdateApproveRequest(Guid requestId, [FromBody] bool approve)
        {
            try
            {
                // Find the profile by userId
                var request = await _context.Request.FindAsync(requestId);

                if (request == null)
                {
                    return NotFound(); // Return 404 if profile is not found
                }

                // Update the AvatarURL
                request.Approved = approve;
                request.Seen = true;

                // Save changes to the database
                await _context.SaveChangesAsync();

                if(approve == true)
                {
                    AdController adController = new AdController(_context);


                    if (request.JobOffer == true)
                    {
                        await adController.UpdateExpert(request.AdId, request.ReceiverId);
                        

                    }
                    else if (request.JobOffer == false)
                    {
                        await adController.UpdateExpert(request.AdId, request.ApplicantId);
                    }

                    var ad = _context.Advertisement
                        .Where(ad=>ad.AdId == request.AdId)
                        .FirstOrDefault();
                    return Ok(ad);
                }

                return Ok(request);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update-seen/{requestId}")]
        public async Task<IActionResult> UpdateSeenRequest(Guid requestId, [FromBody] bool seen)
        {
            try
            {
                // Find the profile by userId
                var profile = await _context.Request.FindAsync(requestId);

                if (profile == null)
                {
                    return NotFound(); // Return 404 if profile is not found
                }

                // Update the AvatarURL
                profile.Seen = seen;

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok(profile);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("already-aplied")]
        public async Task<IActionResult> CheckAlreadyIfAplied(string profileId, int adId)
        {
            try
            {
                var aplied = await _context.Request
                    .AnyAsync(r => r.ApplicantId == profileId && r.AdId == adId);
                    //.AnyAsync(r =>
                    //    (r.FirstProfileId == firstProfileId && r.SecondProfileId == secondProfileId) ||
                    //    (r.FirstProfileId == secondProfileId && r.SecondProfileId == firstProfileId)
                    //);

                return Ok(new { aplied });
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("approved-user")]
        public async Task<IActionResult> CheckIfUserApproved(string profileId, int adId)
        {
            try
            {
                var userApproved = await _context.Request
                    .AnyAsync(r => r.ApplicantId == profileId && r.AdId == adId && r.Approved == true);
                //.AnyAsync(r =>
                //    (r.FirstProfileId == firstProfileId && r.SecondProfileId == secondProfileId) ||
                //    (r.FirstProfileId == secondProfileId && r.SecondProfileId == firstProfileId)
                //);

                return Ok(new { userApproved });
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
