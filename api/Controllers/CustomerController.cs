using api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CustomerController : Controller
    {
        [HttpGet("all")]
        public async Task<IEnumerable<Customer>> GetAll()
        {
            List<Customer> list = new List<Customer>();

            return list;
        }

        [HttpGet("id")]
        public async Task<Customer> GetById(int id)
        {
            Customer c = new Customer();

            return c;
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<Customer>> GetByPredicate(Predicate<Customer> predicate)
        {
            IEnumerable<Customer> filtered = GetAll().Result;

            return filtered;
        }

        [HttpPut("create")]
        public async Task<Customer> Create(Customer c)
        {
            return c;
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
