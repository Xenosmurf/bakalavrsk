using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("postcards")]
    [ApiController]
    public class PostCardController : ControllerBase
    {
        private readonly AppDBContext _context;
        public PostCardController(AppDBContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //[Route("{authorId}")]
        //public IActionResult GetAdvertisementsByAuthorId(string authorId)
        //{
        //    try
        //    {
        //        // Query your data source for advertisements by authorId
        //        var ads = _context.Advertisement
        //            .Where(ad => ad.AuthorId == authorId)
        //            .ToList();

        //        if (ads == null || !ads.Any())
        //        {
        //            return NotFound(); // No advertisements found for the given authorId
        //        }

        //        return Ok(ads); // Return the list of advertisements
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log or handle the exception
        //        Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
        //        return StatusCode(500, "Internal server error");
        //    }
        //}

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetPostsByUserId(string userId)
        {
            try
            {
                var posts = _context.PostCard
                    .Where(post => post.AuthorPostId == userId)
                    .ToList();
                if (posts == null || !posts.Any())
                {
                    return NotFound();
                }
                return Ok(posts);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }

        }

        //[HttpGet("images/{userId}")]
        //public async Task<IActionResult> GetPostsByUserIdWithImages(string userId)
        //{
        //    try
        //    {
        //        var posts = await _context.PostCard
        //            .Where(post => post.AuthorPostId == userId)
        //            .Include(post => post.PostImages)
        //            .ToListAsync();

        //        if (posts == null || !posts.Any())
        //        {
        //            return NotFound();
        //        }

        //        return Ok(posts);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.ToString());
        //        return StatusCode(500, "Internal server error");
        //    }
        //}

        //[HttpGet("myimages/{userId}")]
        //public async Task<IActionResult> GetPostsByUserIdWithImages(string userId)
        //{
        //    try
        //    {
        //        var postWithimages = await (from post in _context.PostCard
        //                                        join image in _context.PostImages
        //                                        on post.PostId equals image.PostId into joinedData
        //                                        from image in joinedData.DefaultIfEmpty()
        //                                        where post.AuthorPostId == userId
        //                                        //where profile.UserId == authorId
        //                                        select new
        //                                        {
        //                                            post.PostId,
        //                                            post.PostCardText,
        //                                            post.CreatedAt,
        //                                            post.AuthorPostId,
        //                                            Images = image,
        //                                            //AuthorRatingExpert = profile.RatingExpert,
        //                                            //AuthorRatingEmplyer = profile.RatingEmployer,
        //                                            //AuthorNumberReviewEmplyer = profile.NumberReviewEmployer,
        //                                            //Author
        //                                        }).ToListAsync();

        //        return Ok(postWithimages);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log or handle the exception
        //        Console.WriteLine(ex.ToString(), "An error occurred while fetching postWithimages.");
        //        return StatusCode(500, "Internal server error, postWithimages");
        //    }
        //}

        [HttpGet("myimages/{userId}")]
        public async Task<IActionResult> GetPostsByUserIdWithImages(string userId)
        {
            try
            {
                var postWithImages = await _context.PostCard
                    .Where(post => post.AuthorPostId == userId)
                    .OrderByDescending(post => post.CreatedAt)
                    .GroupJoin(
                        _context.PostImages,
                        post => post.PostId,
                        image => image.PostId,
                        (post, images) => new
                        {
                            post.PostId,
                            post.PostCardText,
                            post.CreatedAt,
                            post.AuthorPostId,
                            Images = images.Select(image => new
                            {
                                image.PostImageId,
                                image.PostImageUrl
                            }).ToList()
                        })
                    .ToListAsync();

                return Ok(postWithImages);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString(), "An error occurred while fetching postWithImages.");
                return StatusCode(500, "Internal server error, postWithImages");
            }
        }



        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePostById(int postId)
        {
            try
            {
                // Find the advertisement by its ID
                var post = await _context.PostCard.FindAsync(postId);

                if (post == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }

                //var adImages = _context.PostImages.Where(ai => ai.PostId == postId);
                //_context.PostImages.RemoveRange(adImages);

                // Remove the advertisement from the DbSet
                _context.PostCard.Remove(post);

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

        [HttpDelete("postimages/{postId}")]
        public async Task<IActionResult> DeletePostImagesById(int postId)
        {
            try
            {
                // Find the advertisement by its ID
                //var post = await _context.PostCard.FindAsync(postId);

                //if (post == null)
                //{
                //    return NotFound(); // Return 404 if advertisement is not found
                //}

                var adImages = _context.PostImages.Where(ai => ai.PostId == postId);

                
                _context.PostImages.RemoveRange(adImages);

                // Remove the advertisement from the DbSet
                //_context.PostCard.Remove(post);

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

        [HttpPost("create")]
        public async Task<IActionResult> CreatePost([FromBody] PostCardModel model)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.PostCard.Add(model);
                await _context.SaveChangesAsync();


                var postId = model.PostId;

                return Ok(new { postId });

            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Failed to create advertisement");
            }
        }


    }
}
