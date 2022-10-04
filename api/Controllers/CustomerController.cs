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
        [HttpGet("all")]
        public async Task<IEnumerable<CustomerDetailView>> GetAll()
        {
            List<Customer> list = new List<Customer>();
            list.Add(new Customer
            {
                CustomerId = 1,
                
                FirstName = "John",
                LastName = "Doe",
                
                CustomerTypeId = CustomerTypesEnum.PERSONAL,
                Company = "Company X",
            });

            list.Add(new Customer
            {
                CustomerId = 2,
                
                FirstName = "Jane",
                LastName = "Doe",
                
                CustomerTypeId = CustomerTypesEnum.FLEET,
            });

            List<CustomerDetailView> view = new List<CustomerDetailView>();
            view.Add(new CustomerDetailView(list[0]));
            view.Add(new CustomerDetailView(list[1]));

            return view;
        }

        [HttpGet("id")]
        public async Task<Customer> GetById(int id)
        {
            Customer c = new Customer();

            return c;
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
            Customer customer = new Customer();
            return customer;
        }

        [HttpPatch("update")]
        public async Task<Customer> Update(int id, Customer c)
        {
            return c;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(int id, Customer c)
        {
            bool isDeleteSuccessful = true;

            return isDeleteSuccessful;
        }
    }
}
