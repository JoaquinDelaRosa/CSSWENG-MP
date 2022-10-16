using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

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
        public override IEnumerable<UserDetailView> GetAll()
        {
            List<UserDetailView> view = new List<UserDetailView>();

            foreach (User user in repository.GetAll())
            {
                view.Add(new UserDetailView(user));
            }

            return view;
        }

        [HttpGet("filter")]
        public override IEnumerable<UserDetailView> GetByPredicate(Predicate<User> predicate)
        {
            IEnumerable<UserDetailView> filtered = GetAll();

            return filtered;
        }
    }
}
