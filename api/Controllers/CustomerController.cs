using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using static System.Net.Mime.MediaTypeNames;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CustomerController : Controller
    {
        private readonly CustomerRepository customerRepository;
        public CustomerController(AutoworksDBContext ctx)
        {
            this.customerRepository = new CustomerRepository(ctx);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<CustomerDetailView>> GetAll()
        {
            List<CustomerDetailView> view = new List<CustomerDetailView>();

            foreach (Customer customer in customerRepository.GetAll())
            {
                view.Add(new CustomerDetailView(customer));
            }

            return view;
        }

        [HttpGet("id")]
        public async Task<Customer> GetById(ulong id)
        {
            return await customerRepository.Get<ulong>(id);
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<CustomerDetailView>> GetByPredicate(Predicate<Customer> predicate)
        {
            IEnumerable<CustomerDetailView> filtered = GetAll().Result;


            return filtered;
        }

     
        [HttpPost("create")]
        public async Task<Customer> Create(Customer c)
        {
            customerRepository.Create(c);

            return c;
        }


        [HttpPost("update")]
        public bool Update(ulong id, Customer newCustomer)
        {
            Customer toModify = GetById(id).Result;
            customerRepository.Update(toModify);
            toModify.AssignTo(newCustomer);

            customerRepository.Save();
            return true;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(ulong id)
        {
            customerRepository.Remove(await GetById(id));
            return true;
        }
    }
}
