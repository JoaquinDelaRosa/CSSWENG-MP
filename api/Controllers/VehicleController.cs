using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class VehicleController : Controller
    {
        [HttpGet("all")]
        public async Task<IEnumerable<Vehicle>> GetAll()
        {
            List<Vehicle> list = new List<Vehicle>();

            return list;
        }

        [HttpGet("id")]
        public async Task<Vehicle> GetById(int id)
        {
            Vehicle c = new Vehicle();

            return c;
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<Vehicle>> GetByPredicate(Predicate<Vehicle> predicate)
        {
            IEnumerable<Vehicle> filtered = GetAll().Result;

            return filtered;
        }

        [HttpPut("create")]
        public async Task<Vehicle> Create(Vehicle c)
        {
            return c;
        }

        [HttpPatch("update")]
        public async Task<Vehicle> Update(int id, Vehicle c)
        {
            return c;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(int id, Vehicle c)
        {
            bool isDeleteSuccessful = true;

            return isDeleteSuccessful;
        }
    }
}
