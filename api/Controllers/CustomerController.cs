using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize(Roles = "ADMIN")]
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

        public async override Task<IEnumerable<CustomerDetailView>> GetByPredicate(Predicate<Customer> predicate)
        {
            IEnumerable<CustomerDetailView> filtered = await GetAll();

            return filtered;
        }
    }
}
