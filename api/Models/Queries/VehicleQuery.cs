namespace api.Models.Queries
{
    public class VehicleQuery : IModelQuery<Vehicle>
    {
        public string LicensePlate { get; set; } = "";
        public string Manufacturer { get; set; } = "";
        public string Model { get; set; } = "";
        public int YearManufactured { get; set; } = -1;

        public override bool IsSatisfied(Vehicle x)
        {
            return ((LicensePlate == "") ? true : x.LicensePlate.Contains(LicensePlate)) &&
            ((Manufacturer == "") ? true : x.Manufacturer.Contains(Manufacturer)) &&
            ((Model == "") ? true : x.Model.Contains(Model)) &&
            ((YearManufactured == -1) ? true : x.YearManufactured == YearManufactured);
        }
    }
}
