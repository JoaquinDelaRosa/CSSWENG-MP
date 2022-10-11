using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]


    public class UserController : Controller
    {
        private readonly UserRepository userRepository;
        public UserController(AutoworksDBContext ctx)
        {
            this.userRepository = new UserRepository(ctx);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<UserDetailView>> GetAll()
        {
            List<UserDetailView> view = new List<UserDetailView>();

            foreach (User user in userRepository.GetAll())
            {
                view.Add(new UserDetailView(user));
            }

            return view;
        }

        [HttpGet("id")]
        public async Task<User> GetById(int id)
        {
            return await userRepository.Get(id);
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<UserDetailView>> GetByPredicate(Predicate<User> predicate)
        {
            IEnumerable<UserDetailView> filtered = GetAll().Result;

            return filtered;
        }

        [HttpPut("create")]
        public async Task<User> Create(User c)
        {
            userRepository.Create(c);
            return c;
        }

        [HttpPatch("update")]
        public bool Update(int id, User u)
        {
            User toModify = GetById(id).Result;
            userRepository.Update(toModify);
            toModify.AssignTo(u);

            userRepository.Save();
            return true;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(int id)
        {
            userRepository.Remove(await GetById(id));
            return true;
        }
    }
}
