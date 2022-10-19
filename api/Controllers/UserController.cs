using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]


    public class UserController : GenericItemController<User, UserDetailView>
    {
        public UserController(AutoworksDBContext ctx) : base(new UserRepository(ctx))
        {

        }

        [HttpGet("all")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<UserDetailView>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<UserDetailView> view = new List<UserDetailView>();

            foreach (User user in repository.GetAll())
            {
                view.Add(new UserDetailView(user));
            }

            return view;
        }

        [HttpGet("filter")]
        public async override Task<IEnumerable<UserDetailView>> GetByPredicate(Predicate<User> predicate)
        {
            IEnumerable<UserDetailView> filtered = await GetAll();

            return filtered;
        }
    }
}
