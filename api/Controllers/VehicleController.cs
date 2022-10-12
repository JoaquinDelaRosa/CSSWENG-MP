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
        public IEnumerable<VehicleDetailView> GetAll()
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
        public async Task<Vehicle?> GetById(int id)
        {
            return await vehicleRepository.Get(id);
        }

        [HttpGet("filter")]
        public IEnumerable<VehicleDetailView> GetByPredicate(Predicate<Vehicle> predicate)
        {
            IEnumerable<VehicleDetailView> filtered = GetAll();

            return filtered;
        }

        [HttpPost("create")]
        public Vehicle Create(Vehicle v)
        {
            vehicleRepository.Create(v);

            return v;
        }

        [HttpPost("update")]
        public bool Update(int id, Vehicle v)
        {
            Vehicle? toModify = GetById(id).Result;
            if (toModify == null)
                return false;

            vehicleRepository.Update(toModify);
            toModify.AssignTo(v);

            vehicleRepository.Save();
            return true;
        }

        [HttpDelete("delete")]
        public async Task<bool> Delete(int id)
        {
            Vehicle? toRemove = await GetById(id);
            if (toRemove == null)
                return false;

            vehicleRepository.Remove(toRemove);
            return true;
        }
    }
}
