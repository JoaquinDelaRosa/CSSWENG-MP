using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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

        [HttpGet("filter")]
        public async Task<IEnumerable<CustomerDetailView>> GetByCustomerName(string customerName)
        {
            List<CustomerDetailView> view = new List<CustomerDetailView>();

            foreach (Customer customer in (repository as CustomerRepository).GetByCustomerName(customerName))
            {
                view.Add(new CustomerDetailView(customer));
            }

            return view;
        }
    }
}
