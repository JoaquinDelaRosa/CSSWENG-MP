using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize(Roles = "ADMIN")]
    public class CustomerController : Controller
    {
        private readonly CustomerRepository customerRepository;
        public CustomerController(AutoworksDBContext ctx)
        {
            this.customerRepository = new CustomerRepository(ctx);
        }

        [HttpGet("all")]
        public IEnumerable<CustomerDetailView> GetAll()
        {
            List<CustomerDetailView> view = new List<CustomerDetailView>();

            foreach (Customer customer in customerRepository.GetAll())
            {
                view.Add(new CustomerDetailView(customer));
            }

            return view;
        }

        [HttpGet("id")]
        public async Task<Customer?> GetById(int id)
        {
            return await customerRepository.Get(id);
        }

        [HttpGet("filter")]
        public IEnumerable<CustomerDetailView> GetByPredicate(Predicate<Customer> predicate)
        {
            IEnumerable<CustomerDetailView> filtered = GetAll();

            return filtered;
        }

     
        [HttpPost("create")]
        public Customer Create(Customer c)
        {
            customerRepository.Create(c);

            return c;
        }


        [HttpPatch("update")]
        public bool Update(int id, Customer c)
        {
            Customer? toModify = GetById(id).Result;
            if (toModify == null)
                return false;

            customerRepository.Update(toModify);
            toModify.AssignTo(c);

            customerRepository.Save();
            return true;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(int id)
        {
            Customer? toRemove = await GetById(id);
            if (toRemove == null)
                return false;

            customerRepository.Remove(toRemove);
            return true;
        }
    }
}
