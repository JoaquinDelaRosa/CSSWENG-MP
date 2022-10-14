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
    public class CustomerTypeController : Controller
    {
        private readonly CustomerTypeRepository customerRepository;
        public CustomerTypeController(AutoworksDBContext ctx)
        {
            this.customerRepository = new CustomerTypeRepository(ctx);
        }

        [HttpGet("all")]
        public IEnumerable<CustomerType> GetAll()
        {
            List<CustomerType> view = new List<CustomerType>();

            foreach (CustomerType type in customerRepository.GetAll())
            {
                view.Add(type);
            }

            return view;
        }

        [HttpGet("id")]
        public async Task<CustomerType?> GetById(int id)
        {
            return await customerRepository.Get(id);
        }

        [HttpGet("filter")]
        public IEnumerable<CustomerType> GetByPredicate(Predicate<Customer> predicate)
        {
            IEnumerable<CustomerType> filtered = GetAll();

            return filtered;
        }


        [HttpPost("create")]
        public CustomerType Create(CustomerType c)
        {
            customerRepository.Create(c);

            return c;
        }


        [HttpPatch("update")]
        public bool Update(int id, CustomerType c)
        {
            CustomerType? toModify = GetById(id).Result;
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
            CustomerType? toRemove = await GetById(id);
            if (toRemove == null)
                return false;

            customerRepository.Remove(toRemove);
            return true;
        }
    }
}
