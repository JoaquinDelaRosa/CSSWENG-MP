using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class VehicleController : GenericItemController<Vehicle, VehicleDetailView>
    {
        public VehicleController(AutoworksDBContext ctx) : base (new VehicleRepository(ctx))
        {

        }
        [HttpGet("all")]
        public override IEnumerable<VehicleDetailView> GetAll()
        {
       
            List<VehicleDetailView> view = new List<VehicleDetailView>();

            foreach (Vehicle vehicle in repository.GetAll())
            {
                view.Add(new VehicleDetailView(vehicle));
            }


            return view;
        }

        [HttpGet("filter")]
        public override IEnumerable<VehicleDetailView> GetByPredicate(Predicate<Vehicle> predicate)
        {
            IEnumerable<VehicleDetailView> filtered = GetAll();

            return filtered;
        }
    }
}
