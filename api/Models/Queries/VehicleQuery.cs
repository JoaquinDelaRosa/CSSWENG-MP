namespace api.Models.Queries
{
    public class VehicleQuery : IModelQuery<Vehicle>
    {
        private static int DEFAULT_YEAR_MANUFACTURED = -1;

        public string LicensePlate { get; set; } = "";
        public string Manufacturer { get; set; } = "";
        public string Model { get; set; } = "";
        public int YearManufactured { get; set; } = DEFAULT_YEAR_MANUFACTURED;

        public override bool IsSatisfied(Vehicle x)
        {
            return ((LicensePlate == "") ? true : x.LicensePlate.Contains(LicensePlate)) &&
            ((Manufacturer == "") ? true : x.Manufacturer.Contains(Manufacturer)) &&
            ((Model == "") ? true : x.Model.Contains(Model)) &&
            ((YearManufactured == DEFAULT_YEAR_MANUFACTURED) ? true : x.YearManufactured == YearManufactured);
        }
    }
}
