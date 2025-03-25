using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("image")]
    [ApiController]
    public class ImageBlobController : ControllerBase
    {
        public ImagesService _service;
        public ImageBlobController(ImagesService service)
        {

            _service = service;

        }

        [HttpPost]
        public async Task<IActionResult> UploadImages(List<IFormFile> images, string prefix)
        {
            var response = await _service.UploadImages(images, prefix);
            return Ok(response);
        }

        [HttpPost("one")]
        public async Task<IActionResult> UploadOneImage(IFormFile image, string prefix)
        {
            var response = await _service.UploadOneImage(image, prefix);
            return Ok(response);
        }


        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetImagesList()
        {
            var response = await _service.GetUploadedBlobs();
            return Ok(response);
        }

        [HttpGet]
        [Route("bloburl")]

        public  IActionResult GetBlobUrl(string name)
        {
            var respons = _service.GetImageUrl(name);
            return Ok(respons);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBlob(string name)
        {

            var response = _service.DeleteImageAsync(name);

            if (await response)
            {
                return Ok(new { message = "Image deleted successfully." });
            }
            else
            {
                return StatusCode(500, "Internal server error, unable to delete image.");
            }
        }
    }
}
