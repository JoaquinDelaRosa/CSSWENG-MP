using api.Data;
using api.Models;
using api.Models.Queries;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CustomerController : GenericItemController<Customer, CustomerDetailView>
    {
        public CustomerController(AutoworksDBContext ctx) : base(new CustomerRepository(ctx))
        {

        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<CustomerDetailView>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<CustomerDetailView> view = new List<CustomerDetailView>();

            foreach (Customer customer in repository.GetAll())
            {
                view.Add(new CustomerDetailView(customer));
            }

            return view;
        }

        public async override Task<CustomerDetailView?> Get(int id)
        {
            Customer? c = await GetRaw(id);
            if (c == null)
                return null;

            return new CustomerDetailView(c);
        }

        [HttpPost("filter")]
        [AllowAnonymous]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<CustomerDetailView>> Find(CustomerQuery query)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<CustomerDetailView> view = new List<CustomerDetailView>();

            foreach (Customer customer in repository.Find(query))
            {
                view.Add(new CustomerDetailView(customer));
            }

            return view;
        }

        [HttpGet("sort")]
        [AllowAnonymous]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<CustomerDetailView>> Sort(string arg, bool isAscending = true, int from = 0, int limit = int.MaxValue){

            List<CustomerDetailView> view = new List<CustomerDetailView>();
            IEnumerable<Customer> result = new List<Customer>();

            switch (arg.ToUpper())
            {
                case "NAME":
                    result =  repository.Sort(x => x.FirstName, isAscending, from, limit);
                    break;
            }

            foreach (Customer c in result)
            {
                view.Add(new CustomerDetailView(c));
            }

            return view;
        }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    }
}
