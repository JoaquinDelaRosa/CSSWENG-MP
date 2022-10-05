using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]


    public class UserController : Controller
    {

        [HttpGet("all")]
        public async Task<IEnumerable<User>> GetAll()
        {
            List<User> list = new List<User>();

            return list;
        }

        [HttpGet("id")]
        public async Task<User> GetById(int id)
        {
            User c = new User();

            return c;
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<User>> GetByPredicate(Predicate<User> predicate)
        {
            IEnumerable<User> filtered = GetAll().Result;

            return filtered;
        }

        [HttpPut("create")]
        public async Task<User> Create(User c)
        {
            return c;
        }

        [HttpPatch("update")]
        public async Task<User> Update(int id, User c)
        {
            return c;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(int id, User c)
        {
            bool isDeleteSuccessful = true;

            return isDeleteSuccessful;
        }
    }
}
