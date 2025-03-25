using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("price")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly AppDBContext _context;
        public PriceController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet("list/{userId}")]
        public IActionResult GetPriceListByUserId(string userId)
        {
            try
            {
                var prices = _context.PriceItem
                    .Where(pr => pr.UserId == userId)
                    .ToList();

                if (prices == null || !prices.Any())
                {
                    return Ok(prices); 
                }

                return Ok(prices); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString(), "An error occurred while fetching advertisements.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePriceItem([FromBody] PriceItemModel model)
        {
            try
            {
                // Assuming your DbContext is named _context
                _context.PriceItem.Add(model);
                await _context.SaveChangesAsync();

                return Ok("PriceItem created successfully");
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to create PriceItem");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePriceItem(int id)
        {
            try
            {
                // Find the advertisement by its ID
                var priceItem = await _context.PriceItem.FindAsync(id);

                if (priceItem == null)
                {
                    return NotFound(); // Return 404 if advertisement is not found
                }

                // Remove the advertisement from the DbSet
                _context.PriceItem.Remove(priceItem);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok("PriceItem deleted successfully");
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to delete PriceItem");
            }
        }

        //[HttpPut("update/{userId}")]
        //public async Task<IActionResult> UpdatePriceItems(string userId, [FromBody] PriceItemModel updatedModel)
        //{
        //    try
        //    {
        //        // Retrieve all PriceItemModel entries for the specified UserId
        //        var priceItems = await _context.PriceItem.Where(p => p.UserId == userId).ToListAsync();

        //        // If no PriceItemModel entries are found for the specified UserId, return NotFound
        //        if (priceItems == null || !priceItems.Any())
        //        {
        //            return NotFound($"No PriceItemModel entries found for UserId: {userId}");
        //        }

        //        // Update each PriceItemModel entry with the updated data
        //        foreach (var priceItem in priceItems)
        //        {
        //            priceItem.PriceName = updatedModel.PriceName;
        //            priceItem.Payment = updatedModel.Payment;
        //            // You can update other properties as needed
        //        }

        //        // Save changes to the database
        //        await _context.SaveChangesAsync();

        //        return Ok($"PriceItemModel entries updated successfully for UserId: {userId}");
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log or handle the exception
        //        return StatusCode(500, "Failed to update PriceItemModel entries");
        //    }
        //}

        [HttpDelete("deleteall/{userId}")]
        public async Task<IActionResult> DeletePriceItemsByUserId(string userId)
        {
            try
            {
                // Find all PriceItemModel entries for the specified UserId
                var priceItems = await _context.PriceItem.Where(p => p.UserId == userId).ToListAsync();

                // If no PriceItemModel entries are found for the specified UserId, return NotFound
                if (priceItems == null || !priceItems.Any())
                {
                    //return NotFound($"No PriceItemModel entries found for UserId: {userId}");
                    return Ok(new List<PriceItemModel>());
                }

                // Remove all the PriceItemModel entries from the DbSet
                _context.PriceItem.RemoveRange(priceItems);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok($"All PriceItemModel entries deleted successfully for UserId: {userId}");
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, "Failed to delete PriceItemModel entries");
            }
        }

        [HttpPost("createall/{userId}")]
        public async Task<IActionResult> CreatePriceItems(string userId, [FromBody] List<PriceItemModel> priceItems)
        {
            try
            {
                // Add the UserId to each PriceItemModel
                foreach (var item in priceItems)
                {
                    item.UserId = userId;
                }

                // Add the list of PriceItemModel entries to the context
                await _context.PriceItem.AddRangeAsync(priceItems);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok($"PriceItemModel entries created successfully for UserId: {userId}");
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, $"Failed to create PriceItemModel entries for UserId: {userId}");
            }
        }




    }
}
