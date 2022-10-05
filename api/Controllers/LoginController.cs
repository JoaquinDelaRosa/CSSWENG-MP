using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class LoginController : ControllerBase
    {
        public class LoginRequest
        {
            public string Username { get; set; } = "";
            public string Password { get; set; } = "";
        }

        [HttpPost("")]
        public async Task<User?> Login(LoginRequest text)
        {

            User user = new()
            {
                Id = 1,
                Username = "admin",
                Password = text.Username + "-" +text.Password
            };

            return user;
        }
    }
}