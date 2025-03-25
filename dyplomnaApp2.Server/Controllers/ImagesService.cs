using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;

namespace dyplomnaApp2.Server.Controllers
{
    public class BlobUrlResponse
    {
        public string Url { get; set; }
    }
    public class ImagesService
    {
        BlobServiceClient _blobServiceClient;
        BlobContainerClient _containerServiceClient;
        string connectionStringStorage = "DefaultEndpointsProtocol=https;AccountName=dyplomnastorage;AccountKey=YXRoX6gt8559PfYIR7n4bhhr4reNqrJu4bq4jm4xv6bZl8fFmUsHWs/UjRhzy8jyWzDesBIZ+Kkg+AStnAplFA==;EndpointSuffix=core.windows.net";
        public ImagesService()
        {
            _blobServiceClient = new BlobServiceClient(connectionStringStorage);
            _containerServiceClient = _blobServiceClient.GetBlobContainerClient("images");
        }

        public async Task<List<BlobContentInfo>> UploadImages(List<IFormFile> files, string prefix)
        {
            var azureResponse = new List<BlobContentInfo>();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".avif" };
            foreach (var file in files)
            {
                string extension = Path.GetExtension(file.FileName).ToLower();
                if (allowedExtensions.Contains(extension))
                {
                    string imageName = prefix + file.FileName;
                    using (var memoryStream = new MemoryStream())
                    {
                        file.CopyTo(memoryStream);
                        memoryStream.Position = 0;

                        var blobHttpHeaders = new BlobHttpHeaders
                        {
                            ContentDisposition = "inline"
                        };

                        var client = await _containerServiceClient.UploadBlobAsync(imageName, memoryStream, default);
                        azureResponse.Add(client);
                    }
                }
            }
            return azureResponse;

        }

        public async Task<BlobContentInfo> UploadOneImage(IFormFile file, string prefix)
        {
            BlobContentInfo azureResponse = null; 
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".avif" };
           
                string extension = Path.GetExtension(file.FileName).ToLower();
                if (allowedExtensions.Contains(extension))
                {
                    string imageName = prefix + file.FileName;
                    using (var memoryStream = new MemoryStream())
                    {
                        file.CopyTo(memoryStream);
                        memoryStream.Position = 0;



                        var blobHttpHeaders = new BlobHttpHeaders
                        {
                          
                            ContentDisposition = "inline"
                        };

                    BlobClient blobClient = _containerServiceClient.GetBlobClient(imageName);
                    azureResponse = await blobClient.UploadAsync(memoryStream, blobHttpHeaders);
                }
                }
            
            return azureResponse;

        }

        public async Task<List<BlobItem>> GetUploadedBlobs()
        {
            var images = new List<BlobItem>();
            var UploadedFiles = _containerServiceClient.GetBlobsAsync();
            await foreach(BlobItem blobItem in UploadedFiles)
            {
                images.Add(blobItem);
            }
            return images;
        }

        //public string GetImageUrl(string blobName)
        //{
        //    var blobClient = _containerServiceClient.GetBlobClient(blobName);

        //    // Generate the URL for the blob
        //    var blobUri = blobClient.Uri;

        //    return blobUri.ToString();
        //}

       

        public BlobUrlResponse GetImageUrl(string blobName)
        {
            // Construct the URL for the blob content
            var blobUri = new Uri($"https://{_containerServiceClient.AccountName}.blob.core.windows.net/{_containerServiceClient.Name}/{blobName}");

            //return blobUri.ToString();
            return new BlobUrlResponse { Url = blobUri.ToString() };

        }

        public async Task<bool> DeleteImageAsync(string blobName)
        {
          
            try
            {
                // Get a reference to the blob
                BlobClient blobClient = _containerServiceClient.GetBlobClient(blobName);

                // Delete the blob
                var response = await blobClient.DeleteIfExistsAsync();

                // Return true if the blob was successfully deleted, false otherwise
                return response.Value;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the blob: {ex.Message}");
                return false;
            }
        }




         //public async Task<bool[]> DeleteImagesAsync(List<string> blobUrls)
         //{
         //   try
         //   {
         //       bool[] deleteResults = new bool[blobUrls.Count];

         //       for (int i = 0; i < blobUrls.Count; i++)
         //       {
         //           string blobUrl = blobUrls[i];

         //           // Extract blob name from URL
         //           Uri uri = new Uri(blobUrl);
         //           string blobName = uri.Segments.Last(); // Get the last segment of the URL

         //           // Get a reference to the blob
         //           BlobClient blobClient = _containerServiceClient.GetBlobClient(blobName);

         //           // Delete the blob
         //           var response = await blobClient.DeleteIfExistsAsync();

         //           // Store the delete result
         //           deleteResults[i] = response.Value;
         //       }

         //       // Return an array of delete results
         //       return deleteResults;
         //   }
         //   catch (Exception ex)
         //   {
         //       Console.WriteLine($"An error occurred while deleting the blobs: {ex.Message}");
         //       return new bool[blobUrls.Count]; // Return an array of false values in case of error
         //   }
         //}




}
}
