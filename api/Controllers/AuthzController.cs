using api.Controllers.Crypto;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthzController : ControllerBase
    {
        public class LoginRequest
        {
            public string Username { get; set; } = "";
            public string Password { get; set; } = "";
        }

        public class RegistrationRequest
        {
            public string Username { get; set; } = "";
            public string Password { get; set; } = "";

            public string FirstName { get; set; } = "";
            public string MiddleName { get; set; } = "";
            public string LastName { get; set; } = "";
        }

        private readonly UserRepository userRepository;
        private readonly EncrypterManager encrypterManager;
        public AuthzController(AutoworksDBContext ctx)
        {
            this.userRepository = new UserRepository(ctx);
            this.encrypterManager = new EncrypterManager(new SHA());
        }

        private User UserFactoryMethod(RegistrationRequest request)
        {
            User u = new User();
            u.FirstName = request.FirstName;
            u.MiddleName = request.MiddleName;
            u.LastName = request.LastName;

            u.Username = request.Username;
            u.Password = encrypterManager.Encrypt(request.Password);

            return u;
        }

        [HttpPost("login")]
        public async Task<User?> Login(LoginRequest request)
        {

            return null;
        }

        [HttpPost("register")]
        public async Task<bool> Register(RegistrationRequest request)
        {
            User user = UserFactoryMethod(request);
            userRepository.Create(user);
            return false;
        }
    }
}