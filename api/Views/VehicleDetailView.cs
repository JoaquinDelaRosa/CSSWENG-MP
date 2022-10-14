using api.Models;

namespace api.Views
{
    public class VehicleDetailView
    {
        public VehicleDetailView(Vehicle vehicle)
        {
            LicensePlate = vehicle.LicensePlate;
            Manufacturer = vehicle.Manufacturer;
            Model = vehicle.Model;
            YearManufactured = vehicle.YearManufactured;
        }

        public string LicensePlate { get; set; } = "";
        public string Manufacturer { get; set; } = "";
        public string Model { get; set; } = "";
        public int YearManufactured { get; set; }
    }
}
