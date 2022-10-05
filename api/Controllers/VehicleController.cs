using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class VehicleController : Controller
    {

        private readonly VehicleRepository vehicleRepository;
        public VehicleController(AutoworksDBContext ctx)
        {
            this.vehicleRepository = new VehicleRepository(ctx);
        }
        [HttpGet("all")]
        public async Task<IEnumerable<VehicleDetailView>> GetAll()
        {
            List<Vehicle> vehicles = new List<Vehicle>();
       
            List<VehicleDetailView> view = new List<VehicleDetailView>();

            foreach (Vehicle vehicle in vehicleRepository.GetAll())
            {
                view.Add(new VehicleDetailView(vehicle));
            }


            return view;
        }

        [HttpGet("id")]
        public async Task<Vehicle> GetById(int id)
        {
            Vehicle c = new Vehicle();

            return c;
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<VehicleDetailView>> GetByPredicate(Predicate<Vehicle> predicate)
        {
            IEnumerable<VehicleDetailView> filtered = GetAll().Result;

            return filtered;
        }

        [HttpPost("create")]
        public async Task<Vehicle> Create(Vehicle v)
        {
            vehicleRepository.Create(v);

            return v;
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
