using api.Controllers.Crypto;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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

        private User UserFactoryMethod(LoginRequest request)
        {
            User u = new User();
            u.Username = request.Username;
            u.Password = encrypterManager.Encrypt(request.Password);

            return u;
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
            User user = userRepository.GetByUsername(request.Username);
            if(user == null)
                return null;
            if (!encrypterManager.IsEqual(request.Password, user.Password))
                return null;

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
            };

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                ExpiresUtc = DateTime.UtcNow.AddMinutes(10),
                IsPersistent = true,
                IssuedUtc = DateTime.UtcNow.AddMinutes(0),
                RedirectUri = "api/login" + user.Username
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties)
             ;

            return user;
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