using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Vehicle : IDBEntity<Vehicle>
    {
        [Key]
        public int VehicleId { get; set; }

        [Required]
        [StringLength(7)]
        public string LicensePlate { get; set; } = "";

        [Required]
        public string Manufacturer { get; set; } = "";
        [Required]
        public string Model { get; set; } = "";
        [Required]
        public int YearManufactured { get; set; }

        public bool IsEqual(Vehicle other)
        {
            return VehicleId == other.VehicleId;
        }

        public override void AssignTo(Vehicle other)
        {
            YearManufactured = other.YearManufactured;
            Manufacturer = other.Manufacturer;
            LicensePlate = other.LicensePlate;
            Model = other.Model;
        }

        public class Query
        {
            public string LiscensePlate { get; set; } = "";
            public string Manufacturer { get; set; } = "";
            public string Model { get; set; } = "";
            public int YearManufactured { get; set; } = -1;
        }
    }
}
