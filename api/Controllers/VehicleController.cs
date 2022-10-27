using api.Data;
using api.Models;
using api.Models.Queries;
using api.Views;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("sort")]
        [AllowAnonymous]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<VehicleDetailView>> Sort(string arg, bool isAscending = true, int from = 0, int limit = int.MaxValue)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {

            List<VehicleDetailView> view = new List<VehicleDetailView>();
            IEnumerable<Vehicle> result = new List<Vehicle>();

            switch (arg.ToLower())
            {
                case "licenseplate":
                    result = repository.Sort(x => x.LicensePlate, isAscending, from, limit);
                    break;

                case "manufacturer":
                    result = repository.Sort(x => x.Manufacturer, isAscending, from, limit);
                    break;

                case "model":
                    result = repository.Sort(x => x.Model, isAscending, from, limit);
                    break;

                case "yearmanufactured":
                    result = repository.Sort(x => x.YearManufactured, isAscending, from, limit);
                    break;
            }

            foreach (Vehicle v in result)
            {
                view.Add(new VehicleDetailView(v));
            }

            return view;
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        [HttpPost("filter")]
        [AllowAnonymous]
        public async Task<IEnumerable<VehicleDetailView>> Find(VehicleQuery vehicleQuery)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<VehicleDetailView> view = new List<VehicleDetailView>();

            foreach (Vehicle vehicle in repository.Find(vehicleQuery))
            {
                view.Add(new VehicleDetailView(vehicle));
            }

            return view;
        }
    }
}
