using dyplomnaApp2.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace dyplomnaApp2.Server.Controllers
{
    [Route("profiles")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly AppDBContext _context;

        public ProfileController(IConfiguration configuration, AppDBContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        //[HttpGet]
        //[Route("all")]
        //public JsonResult GetProfiles()
        //{
        //    string query = "select * from dbo.[Profile]";
        //    DataTable table = new DataTable();
        //    string sqlDatasource = _configuration.GetConnectionString("myDBconnection");
        //    SqlDataReader myReader;
        //    using (SqlConnection myConn = new SqlConnection(sqlDatasource))
        //    {
        //        myConn.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myConn))
        //        {
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myConn.Close();
        //        }
        //    }

        //    return new JsonResult(table);

        //}
        [HttpGet("all")]
        public async Task<List<ProfileModel>> GetProfilesByPage(int pageNumber, int pageSize, string excludeUserId)
        {
            var profiles = await _context.Profile
                .Where(p => p.UserId != excludeUserId)
                .OrderBy(p => p.Created_at) // Assuming you want to order by created date
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return profiles;
        }



        [HttpGet]
        [Route("{id}")]
        public IActionResult GetProfileById(string id)
        {
            string query = "SELECT * FROM dbo.[Profile] WHERE UserId = @id";

            string sqlDatasource = _configuration.GetConnectionString("myDBconnection");
            SqlDataReader myReader;
            ProfileModel profile = new ProfileModel(); // Assuming ProfileModel is your data model
            using (SqlConnection myConn = new SqlConnection(sqlDatasource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    using (myReader = myCommand.ExecuteReader())
                    {
                        if (myReader.Read())
                        {
                            profile.UserId = myReader["UserId"].ToString();
                            profile.Username = myReader["Username"].ToString();
                            profile.Email = myReader["Email"].ToString();
                            profile.Description = myReader["Description"].ToString();
                            profile.AvatarURL = myReader["AvatarURL"].ToString();
                            profile.Created_at = Convert.ToDateTime(myReader["Created_at"]);
                            profile.RatingExpert = (int)myReader["RatingExpert"];
                            profile.RatingEmployer = (int)myReader["RatingEmployer"];
                            profile.NumberReviewExpert = (int)myReader["NumberReviewExpert"];
                            profile.NumberReviewEmployer = (int)myReader["NumberReviewEmployer"];
                        }
                    }
                }
            }

            return new JsonResult(profile);
        }

        //[HttpGet]
        //[Route("myprofile/{email}")]
        //public IActionResult GetMyProfileByEmail(string email)
        //{
        //    string query = "SELECT * FROM dbo.[Profile] WHERE Email = @email";

        //    string sqlDatasource = _configuration.GetConnectionString("myDBconnection");
        //    SqlDataReader myReader;
        //    ProfileModel profile = new ProfileModel(); // Assuming ProfileModel is your data model
        //    using (SqlConnection myConn = new SqlConnection(sqlDatasource))
        //    {
        //        myConn.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myConn))
        //        {
        //            myCommand.Parameters.AddWithValue("@email", email);
        //            using (myReader = myCommand.ExecuteReader())
        //            {
        //                if (myReader.Read())
        //                {
        //                    profile.UserId = myReader["UserId"].ToString();
        //                    profile.Username = myReader["Username"].ToString();
        //                    profile.Email = myReader["Email"].ToString();
        //                    //profile.Password = myReader["password"].ToString();
        //                    profile.Created_at = Convert.ToDateTime(myReader["Created_at"]);
        //                    profile.Description = myReader["Description"].ToString();
        //                }
        //            }
        //        }
        //    }

        //    return new JsonResult(profile);
        //}


        [HttpPost]
        [Route("add-user")]
        public IActionResult AddProfile(ProfileModel profile)
        {
            Console.WriteLine("I Am here");
            string query = "INSERT INTO dbo.[Profile] (UserId, Username, Email, Created_at) VALUES (@UserId, @Username, @Email, @CreatedAt); ";

            string sqlDatasource = _configuration.GetConnectionString("myDBconnection");
            string newUserId = profile.UserId;
            Console.WriteLine("UserId:" + profile.UserId);
            using (SqlConnection myConn = new SqlConnection(sqlDatasource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@UserId", profile.UserId);
                    myCommand.Parameters.AddWithValue("@Username", profile.Username);
                    myCommand.Parameters.AddWithValue("@Email", profile.Email);
                    //myCommand.Parameters.AddWithValue("@Password", profile.Password);
                    myCommand.Parameters.AddWithValue("@CreatedAt", DateTime.Now);

                    myCommand.ExecuteNonQuery();

                    // ExecuteScalar is used to retrieve the generated identity value (user_id)
                    //newUserId = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }

            // If you want to return the newly created profile, you can fetch it from the database using its id
            return RedirectToAction(nameof(GetProfileById), new { id = newUserId });
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult RegisterProfile(ProfileModel profile)
        {
            Console.WriteLine("I Am here");
            string query = "INSERT INTO dbo.[Profile] (Username, Email, Created_at) VALUES (@UserId, @Username, @Email, @CreatedAt);";

            string sqlDatasource = _configuration.GetConnectionString("myDBconnection");
            string newUserId = profile.UserId;
            using (SqlConnection myConn = new SqlConnection(sqlDatasource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {

                    myCommand.Parameters.AddWithValue("@UserId", profile.UserId);
                    myCommand.Parameters.AddWithValue("@Username", profile.Username);
                    myCommand.Parameters.AddWithValue("@Email", profile.Email);
                    //myCommand.Parameters.AddWithValue("@Password", profile.Password);
                    myCommand.Parameters.AddWithValue("@CreatedAt", DateTime.Now);

                    // ExecuteScalar is used to retrieve the generated identity value (user_id)
                    //newUserId = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }

            // If you want to return the newly created profile, you can fetch it from the database using its id
            return RedirectToAction(nameof(GetProfileById), new { id = newUserId });
        }

        [HttpPut("update-avatar/{userId}")]
        public async Task<IActionResult> UpdateAvatarUrl(string userId, [FromBody] string newAvatarUrl)
        {
            try
            {
                // Find the profile by userId
                var profile = await _context.Profile.FindAsync(userId);

                if (profile == null)
                {
                    return NotFound(); // Return 404 if profile is not found
                }

                // Update the AvatarURL
                profile.AvatarURL = newAvatarUrl;

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

        [HttpPut("update-description/{userId}")]
        public async Task<IActionResult> UpdateDescription(string userId, [FromBody] string newDescription)
        {
            try
            {
                // Find the profile by userId
                var profile = await _context.Profile.FindAsync(userId);

                if (profile == null)
                {
                    return NotFound(); // Return 404 if profile is not found
                }

                // Update the AvatarURL
                profile.Description = newDescription;

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

        [HttpPut("update-username/{userId}")]
        public async Task<IActionResult> UpdateUsername(string userId, [FromBody] string username)
        {
            try
            {
                var profile = await _context.Profile.FindAsync(userId);

                if (profile == null)
                {
                    return NotFound(); 
                }

                profile.Username = username;
                await _context.SaveChangesAsync();

                return Ok(profile);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }


    }
    }
