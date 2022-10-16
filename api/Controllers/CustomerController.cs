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
        
        public override IEnumerable<CustomerDetailView> GetAll()
        {
            List<CustomerDetailView> view = new List<CustomerDetailView>();

            foreach (Customer customer in repository.GetAll())
            {
                view.Add(new CustomerDetailView(customer));
            }

            return view;
        }

        public override IEnumerable<CustomerDetailView> GetByPredicate(Predicate<Customer> predicate)
        {
            IEnumerable<CustomerDetailView> filtered = GetAll();

            return filtered;
        }
    }
}
