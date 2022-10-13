using api.Controllers.Crypto;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthzController : ControllerBase
    {

        private IConfiguration _config;

        public AuthzController(IConfiguration config)
        {
            _config = config;
        }

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
            u.LastName = request.LastName;
            u.Username = request.Username;
            u.Password = encrypterManager.Encrypt(request.Password);

            return u;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = Authenticate(request);
            if(user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }
            return NotFound("User Not Found");
        }

        private string? Generate(User user)
        {
            if (user == null)
                return null;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Role, UserTypeToRole(user.Type))
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string UserTypeToRole(UserType userType)
        {
            return userType.ToString();
        }

        private User? Authenticate(LoginRequest request)
        {
            User? currentUser = userRepository.GetByUsername(request.Username);
            if (currentUser == null)
                return null;

            if (encrypterManager.IsEqual(request.Password, currentUser.Password))
                return currentUser;
            
            return null;
        }

        [HttpPost("register")]
        public bool Register(RegistrationRequest request)
        {
            User user = UserFactoryMethod(request);
            userRepository.Create(user);
            return false;
        }
    }
}