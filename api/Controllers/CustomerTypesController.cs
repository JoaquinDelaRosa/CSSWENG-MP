using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CustomerTypeController : GenericItemController<CustomerType, CustomerType>
    {
        public CustomerTypeController(AutoworksDBContext ctx) : base(new CustomerTypeRepository(ctx))
        {

        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<CustomerType>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<CustomerType> view = new List<CustomerType>();

            foreach (CustomerType type in repository.GetAll())
            {
                view.Add(type);
            }

            return view;
        }

        public async override Task<CustomerType?> Get(int id)
        {
            return await GetRaw(id);
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<CustomerType>> GetByPredicate(Predicate<CustomerType> predicate)
        {
            IEnumerable<CustomerType> filtered = await GetAll();

            return filtered;
        }
    }
}
