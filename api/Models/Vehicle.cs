using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Vehicle
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
    }
}
