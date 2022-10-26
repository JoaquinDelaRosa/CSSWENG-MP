using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class VehicleController : GenericItemController<Vehicle, VehicleDetailView>
    {
        public VehicleController(AutoworksDBContext ctx) : base(new VehicleRepository(ctx))
        {

        }
        [HttpGet("all")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<VehicleDetailView>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {

            List<VehicleDetailView> view = new List<VehicleDetailView>();

            foreach (Vehicle vehicle in repository.GetAll())
            {
                view.Add(new VehicleDetailView(vehicle));
            }


            return view;
        }
        public async override Task<VehicleDetailView?> Get(int id)
        {
            Vehicle? v = await GetRaw(id);
            if (v == null)
                return null;

            return new VehicleDetailView(v);
        }

        [HttpPost("filter")]
        public async Task<IEnumerable<VehicleDetailView>> GetByVehicleDetails(Vehicle.Query vehicleQuery)
        {
            List<VehicleDetailView> view = new List<VehicleDetailView>();

            foreach (Vehicle vehicle in (repository as VehicleRepository).GetByVehicleDetails(vehicleQuery))
            {
                view.Add(new VehicleDetailView(vehicle));
            }

            return view;
        }
    }
}
