using api.Models;

namespace api.Views
{
    public class VehicleDetailView
    {
        public VehicleDetailView(Vehicle vehicle)
        {
            Id = vehicle.VehicleId;
            LicensePlate = vehicle.LicensePlate;
            Manufacturer = vehicle.Manufacturer;
            Model = vehicle.Model;
            YearManufactured = vehicle.YearManufactured;
        }

        public int Id { get; set; }
        public string LicensePlate { get; set; } = "";
        public string Manufacturer { get; set; } = "";
        public string Model { get; set; } = "";
        public int YearManufactured { get; set; }
    }
}
