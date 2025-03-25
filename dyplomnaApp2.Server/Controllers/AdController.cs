using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("adserver")]
    [ApiController]
    public class AdController : ControllerBase
    {

        private readonly AppDBContext _context;
        public AdController(AppDBContext context)
        {
            _context = context;
        }
       

        [HttpGet("author/{authorId}")]
        public async Task<IActionResult> GetAdvertisementsWithProfileInfo(string authorId)
        {
            try
            {
                var adsWithProfileInfo = await (from ad in _context.Advertisement
                                                join profile in _context.Profile
                                                on ad.AuthorId equals profile.UserId into joinedData
                                                from profile in joinedData.DefaultIfEmpty()
                                                where ad.AuthorId == authorId
                                                orderby ad.CreatedAt descending // Add this line to sort by CreatedAt in descending order
                                                select new
                                                {
                                                    ad.AdId,
                                                    ad.Title,
                                                    ad.DescriptionAd,
                                                    ad.Payment,
                                                    ad.CreatedAt,
                                                    ad.Deadline,
                                                    ad.StatusAd,
                                                    ad.ExpertId,
                                                    ad.CategoryId,
                                                    AuthorAvatarUrl = profile != null ? profile.AvatarURL : null,
                                                    AuthorUsername = profile != null ? profile.Username : null,
                                                    AdImages = _context.AdImages
                                                        .Where(img => img.AdId == ad.AdId)
                                                        .Select(img => new
                                                        {
                                                            img.PostImageId,
                                                            img.PostImageUrl
                                                        }).ToList()

                                                }).ToListAsync();

                return Ok(adsWithProfileInfo);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
                return StatusCode(500, "Internal server error");
            }
        }

        //[HttpGet("author/offer/{authorId}")]
        //public async Task<IActionResult> GetAdvertisementsToOffer(string authorId, string excludeUserId)
        //{
        //    try
        //    {
        //        var adsWithProfileInfo = await (from ad in _context.Advertisement
        //                                        join profile in _context.Profile
        //                                        on ad.AuthorId equals profile.UserId into joinedData
        //                                        from profile in joinedData.DefaultIfEmpty()
        //                                        where ad.AuthorId == authorId && ad.ExpertId == null
        //                                        orderby ad.CreatedAt descending // Add this line to sort by CreatedAt in descending order
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
        //                                            ad.CategoryId,
        //                                            AuthorAvatarUrl = profile != null ? profile.AvatarURL : null,
        //                                            AuthorUsername = profile != null ? profile.Username : null,
        //                                            AdImages = _context.AdImages
        //                                                .Where(img => img.AdId == ad.AdId)
        //                                                .Select(img => new
        //                                                {
        //                                                    img.PostImageId,
        //                                                    img.PostImageUrl
        //                                                }).ToList()

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

        [HttpGet("author/offer/{authorId}")]
        public async Task<IActionResult> GetAdvertisementsToOffer(string authorId, string excludeUserId)
        {
            try
            {
                var adsWithProfileInfo = await (from ad in _context.Advertisement
                                                join profile in _context.Profile
                                                on ad.AuthorId equals profile.UserId into joinedData
                                                from profile in joinedData.DefaultIfEmpty()
                                                where ad.AuthorId == authorId && ad.ExpertId == null
                                                && !(
                                                    from request in _context.Request
                                                    where request.ApplicantId == excludeUserId
                                                    select request.AdId
                                                   ).Contains(ad.AdId)
                                                orderby ad.CreatedAt descending
                                                select new
                                                {
                                                    ad.AdId, ad.Title, ad.DescriptionAd, ad.Payment, ad.CreatedAt, ad.Deadline, ad.StatusAd, ad.ExpertId, ad.CategoryId,
                                                    AuthorAvatarUrl = profile != null ? profile.AvatarURL : null,
                                                    AuthorUsername = profile != null ? profile.Username : null,
                                                    AdImages = _context.AdImages
                                                        .Where(img => img.AdId == ad.AdId)
                                                        .Select(img => new
                                                        {
                                                            img.PostImageId,
                                                            img.PostImageUrl
                                                        }).ToList()
                                                }).ToListAsync();

                return Ok(adsWithProfileInfo);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
                return StatusCode(500, "Internal server error");
            }
        }




        [HttpGet("expert/{expertId}")]
        public async Task<IActionResult> GetAdvertisementsWithProfileInfoExpertId(string expertId)
        {
            try
            {
                var adsWithProfileInfo = await (from ad in _context.Advertisement
                                                join expertProfile in _context.Profile
                                                on ad.ExpertId equals expertProfile.UserId into expertProfileGroup
                                                from expertProfile in expertProfileGroup.DefaultIfEmpty()
                                                join authorProfile in _context.Profile
                                                on ad.AuthorId equals authorProfile.UserId into authorProfileGroup
                                                from authorProfile in authorProfileGroup.DefaultIfEmpty()
                                                where ad.ExpertId == expertId
                                                select new
                                                {
                                                    ad.AdId,
                                                    ad.Title,
                                                    ad.DescriptionAd,
                                                    ad.Payment,
                                                    ad.CreatedAt,
                                                    ad.Deadline,
                                                    ad.StatusAd,
                                                    ad.ExpertId,
                                                    ad.CategoryId,
                                                    ExpertAvatarUrl = expertProfile != null ? expertProfile.AvatarURL : null,
                                                    ExpertUsername = expertProfile != null ? expertProfile.Username : null,
                                                    AuthorAvatarUrl = authorProfile != null ? authorProfile.AvatarURL : null,
                                                    AuthorUsername = authorProfile != null ? authorProfile.Username : null,
                                                    // Additional fields as required
                                                }).ToListAsync();

                return Ok(adsWithProfileInfo);
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status code
                Console.WriteLine($"Failed to get advertisements: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        [HttpPost("create")]
        public async Task<IActionResult> CreateAdvertisement([FromBody] AdvertisementModel model)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.Advertisement.Add(model);
                await _context.SaveChangesAsync();

                var adId = model.AdId;

                return Ok(new { adId }) ;
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to create advertisement");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            try
            {
                // Find the advertisement by its ID
                var advertisement = await _context.Advertisement.FindAsync(id);

                if (advertisement == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }
                var adImages = _context.AdImages.Where(ai => ai.AdId == id);
                _context.AdImages.RemoveRange(adImages);
                // Remove the advertisement from the DbSet
                _context.Advertisement.Remove(advertisement);



                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to delete advertisement");
            }
        }


        [HttpGet]
        [Route("adwithimages/{adId}")]
        public async Task<IActionResult> GetAdvertisementById(int adId)
        {
            try
            {
                var advertisement = await _context.Advertisement
                    .Where(ad => ad.AdId == adId)
                    .Select(ad => new
                    {
                        ad.AdId,
                        ad.UserId,
                        ad.AuthorId,
                        ad.Title,
                        ad.DescriptionAd,
                        ad.Payment,
                        ad.CreatedAt,
                        ad.Deadline,
                        ad.StatusAd,
                        ad.ExpertId,
                        ad.CategoryId,
                        CategoryName = _context.Category
                            .Where(c => c.CategoryId == ad.CategoryId)
                            .Select(c => c.CategoryName)
                            .FirstOrDefault(),
                        AdImages = _context.AdImages
                            .Where(img => img.AdId == ad.AdId)
                            .Select(img => new
                            {
                                img.PostImageId,
                                img.PostImageUrl
                            }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (advertisement == null)
                {
                    return NotFound();
                }

                return Ok(advertisement);
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status code
                Console.WriteLine($"Failed to get advertisement: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("allads")]
        public async Task<IActionResult> GetAllAds(int pageNumber, int pageSize, string excludeAuthorId)
        {
            try
            {

                var adsWithProfileInfo = await _context.Advertisement
                    .Where(ad => ad.AuthorId != excludeAuthorId && ad.ExpertId == null)
                    .OrderBy(ad => ad.CreatedAt)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select( ad => new
                    {
                        ad.AdId,
                        ad.Title,
                        ad.DescriptionAd,
                        ad.Payment,
                        ad.CreatedAt,
                        ad.Deadline,
                        ad.StatusAd,
                        ad.ExpertId,
                        ad.CategoryId,
                        AuthorUsername = _context.Profile
                            .Where(p => p.UserId == ad.AuthorId)
                            .Select(p => p.Username)
                            .FirstOrDefault(),
                        AuthorAvatarURL = _context.Profile
                            .Where(p => p.UserId == ad.AuthorId)
                            .Select(p => p.AvatarURL)
                            .FirstOrDefault()
                    })
                    .ToListAsync();

                return Ok(adsWithProfileInfo);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("adsbycategory")]
        public async Task<IActionResult> GetAdvertisementsByCategory(int pageNumber, int pageSize, string excludeAuthorId, Guid categoryId)
        {
            try
            {
                var adsWithProfileInfo = await _context.Advertisement
                    .Where(ad => ad.AuthorId != excludeAuthorId && ad.CategoryId == categoryId && ad.ExpertId == null)
                    .OrderBy(ad => ad.CreatedAt)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(ad => new
                    {
                        ad.AdId,
                        ad.Title,
                        ad.DescriptionAd,
                        ad.Payment,
                        ad.CreatedAt,
                        ad.Deadline,
                        ad.StatusAd,
                        ad.ExpertId,
                        ad.CategoryId,
                        AuthorUsername = _context.Profile
                            .Where(p => p.UserId == ad.AuthorId)
                            .Select(p => p.Username)
                            .FirstOrDefault(),
                        AuthorAvatarURL = _context.Profile
                            .Where(p => p.UserId == ad.AuthorId)
                            .Select(p => p.AvatarURL)
                            .FirstOrDefault()
                    })
                    .ToListAsync();

                return Ok(adsWithProfileInfo);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update-expert/{adId}")]
        public async Task<IActionResult> UpdateExpert(int adId, [FromBody] string expertId)
        {
            try
            {
                // Find the profile by userId
                var ad = await _context.Advertisement.FindAsync(adId);

                if (ad == null)
                {
                    return NotFound(); // Return 404 if profile is not found
                }

                // Update the AvatarURL
                ad.ExpertId = expertId;
                ad.StatusAd = "Closed";

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok(ad);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
