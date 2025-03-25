using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDBContext _context;
        public CategoriesController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _context.Category
                    .ToListAsync();
                if(categories == null || !categories.Any())
                {
                    return NotFound();
                }
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withsub")]
        public async Task<IActionResult> GetAllCategoriesWithSubCategories()
        {
            //var advertisement = await _context.Advertisement
            //    .Where(ad => ad.AdId == adId)
            //    .Select(ad => new
            //    {
            //        ad.AdId,
            //        ad.UserId,
            //        ad.AuthorId,
            //        ad.Title,
            //        ad.DescriptionAd,
            //        ad.Payment,
            //        ad.CreatedAt,
            //        ad.Deadline,
            //        ad.StatusAd,
            //        ad.ExpertId,
            //        AdImages = _context.AdImages
            //            .Where(img => img.AdId == ad.AdId)
            //            .Select(img => new
            //            {
            //                img.PostImageId,
            //                img.PostImageUrl
            //            }).ToList()
            //    })
            //    .FirstOrDefaultAsync();

            try
            {
                var categories = await _context.Category
                    .Where(c => c.ParentCategoryId == null)
                    .Select(c => new
                    {
                        c.CategoryId,
                        c.CategoryName,
                        SubCategoryName = _context.Category
                        .Where(sc => sc.ParentCategoryId == c.CategoryId)
                        .Select(sc => new
                        {
                            sc.CategoryId,
                            sc.CategoryName,
                            sc.ParentCategoryId
                        }).ToList()
                    })
                    .ToListAsync();
                if (categories == null || !categories.Any())
                {
                    return NotFound();
                }
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<Guid> CreateCategoryAsync(Guid? parentCategoryId, string categoryName)
        {
            var newCategory = new CategoryModel
            {
                CategoryId = Guid.NewGuid(),
                ParentCategoryId = parentCategoryId,
                CategoryName = categoryName
            };

            try
            {
                _context.Category.Add(newCategory);
                await _context.SaveChangesAsync();
                return newCategory.CategoryId;
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                throw new Exception($"Failed to create category: {ex.Message}", ex);
            }
        }

        [HttpGet("subcategories")]

        public async Task<IActionResult> GetSubcategoriesById(Guid id)
        {
            try
            {
                var subcategories = await _context.Category
                    .Where(c => c.ParentCategoryId == id)
                    .ToListAsync();
                //if (subcategories == null || !subcategories.Any())
                //{
                //    return NotFound();
                //}
                return Ok(subcategories);
            }
            catch(Exception ex)
            {
                throw new Exception($"Failed to get subcategories: {ex.Message}", ex);

            }
        }
    }
}
