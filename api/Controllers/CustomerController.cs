using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CustomerController : Controller
    {
        [HttpGet]
        public async Task<IEnumerable<Customer>> Get()
        {
            Customer customer = new Customer();
            customer.Company = "Company X";

            List<Customer> list = new List<Customer>();
            list.Add(customer);

            return list;
        } 
    }
}
