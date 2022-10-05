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
        [HttpGet("all")]
        public async Task<IEnumerable<VehicleDetailView>> GetAll()
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            vehicles.Add(new Vehicle()
            {
                VehicleId = 1,
                LicensePlate = "ABC1234",
                Manufacturer = "Ford",
                Model = "Everest",
                YearManufactured = 2012
            });
            vehicles.Add(new Vehicle()
            {
                VehicleId = 2,
                LicensePlate = "EUL1024",
                Manufacturer = "Honda",
                Model = "Civic",
                YearManufactured = 2017
            });
            vehicles.Add(new Vehicle()
            {
                VehicleId = 3,
                LicensePlate = "XXX0000",
                Manufacturer = "Isuzu",
                Model = "Elf",
                YearManufactured = 2013
            });


            List<VehicleDetailView> view = new List<VehicleDetailView>();
            view.Add(new VehicleDetailView(vehicles[0]));
            view.Add(new VehicleDetailView(vehicles[1]));
            view.Add(new VehicleDetailView(vehicles[2]));
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
